<script setup lang="ts">
import { ref, nextTick } from 'vue'
import database from '@/data/sql_database.json'

type TableData = Record<string, any[]>

const tables: TableData = database as TableData

const input = ref('')
const output = ref<string[]>([])
const inputRef = ref<HTMLInputElement | null>(null)

const availableTables = Object.keys(tables)
const availableQueries = [
  { cmd: 'SELECT * FROM <table>', desc: 'Select all columns from a table' },
  { cmd: 'SELECT <col1>, <col2> FROM <table>', desc: 'Select specific columns' },
  { cmd: 'SELECT * FROM <table> WHERE <column> = <value>', desc: 'Filter results with condition' },
  { cmd: 'SELECT * FROM <table> ORDER BY <column> ASC|DESC', desc: 'Sort results' },
  { cmd: 'SELECT * FROM <table> LIMIT <number>', desc: 'Limit number of results' },
  { cmd: 'SELECT * FROM <table1> JOIN <table2> ON <condition>', desc: 'Join two tables' },
  { cmd: 'SELECT * FROM <table1> INNER JOIN <table2> ON <condition>', desc: 'Inner join tables' },
  { cmd: 'HELP', desc: 'Show all available commands' },
  { cmd: 'TABLES', desc: 'Show all available tables' },
  { cmd: 'CLEAR', desc: 'Clear the terminal' },
]

function print(text: string, type: 'log' | 'error' | 'success' = 'log') {
  const prefix = type === 'error' ? '❌ ' : type === 'success' ? '✅ ' : ''
  output.value.push(prefix + text)
}

function formatTable(headers: string[], rows: any[][]): string[] {
  const lines: string[] = []
  const widths = headers.map((h, i) => {
    const maxRowLen = Math.max(...rows.map((r) => String(r[i] ?? '').length))
    return Math.max(h.length, maxRowLen)
  })

  const headerRow = headers.map((h, i) => h.padEnd(widths[i] ?? h.length)).join(' | ')
  const separator = widths.map((w) => '-'.repeat(w ?? 0)).join('-+-')

  lines.push('┌─' + separator + '─┐')
  lines.push('│ ' + headerRow + ' │')
  lines.push('├─' + separator + '─┤')

  for (const row of rows) {
    const dataRow = row.map((cell, i) => String(cell ?? '').padEnd(widths[i] ?? 0)).join(' │ ')
    lines.push('│ ' + dataRow + ' │')
  }

  lines.push('└─' + separator + '─┘')
  lines.push(`(${rows.length} row${rows.length !== 1 ? 's' : ''} returned)`)

  return lines
}

function parseCondition(condition: string): { column: string; operator: string; value: string } {
  const match = condition.match(/(\w+)\s*(=|!=|>|<|>=|<=)\s*['"]?([^'"]+)['"]?/)
  if (match) {
    return {
      column: match[1] || '',
      operator: match[2] || '=',
      value: (match[3] || '').trim(),
    }
  }
  return { column: '', operator: '=', value: '' }
}

function applyWhere(data: any[], whereClause: string): any[] {
  const { column, operator, value } = parseCondition(whereClause)
  if (!column) return data

  const columnLower = column.toLowerCase()

  return data.filter((row) => {
    const cellValue = String(row[columnLower] ?? row[column] ?? '')
    const compareValue = value

    switch (operator) {
      case '=':
        return cellValue.toLowerCase() === compareValue.toLowerCase()
      case '!=':
        return cellValue.toLowerCase() !== compareValue.toLowerCase()
      case '>':
        return Number(cellValue) > Number(compareValue)
      case '<':
        return Number(cellValue) < Number(compareValue)
      case '>=':
        return Number(cellValue) >= Number(compareValue)
      case '<=':
        return Number(cellValue) <= Number(compareValue)
      default:
        return true
    }
  })
}

function applyOrderBy(data: any[], orderClause: string): any[] {
  const match = orderClause.match(/(\w+)\s*(ASC|DESC)?/i)
  if (!match) return data

  const column = (match[1] || '').toLowerCase()
  const desc = (match[2] || '').toUpperCase() === 'DESC'

  return [...data].sort((a, b) => {
    const aVal = a[column]
    const bVal = b[column]
    if (aVal < bVal) return desc ? 1 : -1
    if (aVal > bVal) return desc ? -1 : 1
    return 0
  })
}

function applyLimit(data: any[], limit: number): any[] {
  return data.slice(0, limit)
}

function parseJoin(tables: TableData, table1: string, table2: string, condition: string): any[] {
  const t1 = tables[table1.toLowerCase()]
  const t2 = tables[table2.toLowerCase()]
  if (!t1 || !t2) return []

  const { column } = parseCondition(condition.replace(/\w+\./g, ''))
  const columnLower = column.toLowerCase()

  return t1
    .filter((row1) => {
      return t2.some((row2) => {
        const v1 = row1[columnLower] ?? row1[column]
        const v2 = row2[columnLower] ?? row2[column]
        return String(v1).toLowerCase() === String(v2).toLowerCase()
      })
    })
    .flatMap((row1) => {
      return t2
        .filter((row2) => {
          const v1 = row1[columnLower] ?? row1[column]
          const v2 = row2[columnLower] ?? row2[column]
          return String(v1).toLowerCase() === String(v2).toLowerCase()
        })
        .map((row2) => ({ ...row1, ...row2 }))
    })
}

function executeQuery(query: string) {
  const q = query.trim()
  if (!q) return

  print(`> ${q}`, 'log')

  if (q.toUpperCase() === 'CLEAR') {
    output.value = []
    return
  }

  if (q.toUpperCase() === 'TABLES') {
    print('Available tables:', 'log')
    availableTables.forEach((t) => print(`  - ${t}`, 'log'))
    return
  }

  if (q.toUpperCase() === 'HELP') {
    print('Available SQL Commands:', 'log')
    availableQueries.forEach((q) => {
      print(`  ${q.cmd}`, 'log')
      print(`    └─ ${q.desc}`, 'log')
    })
    return
  }

  const upperQ = q.toUpperCase()

  if (upperQ.startsWith('SELECT')) {
    const joinMatch = q.match(/FROM\s+(\w+)\s+(JOIN|INNER JOIN)\s+(\w+)\s+ON\s+(.+)/i)
    if (joinMatch) {
      const table1 = joinMatch[1] || ''
      const table2 = joinMatch[3] || ''
      const condition = joinMatch[4] || ''
      const results = parseJoin(tables, table1, table2, condition)
      if (results.length === 0) {
        print('No results found', 'error')
      } else {
        const headers = Object.keys(results[0])
        const rows = results.map((r) => headers.map((h) => r[h]))
        const lines = formatTable(headers, rows)
        lines.forEach((l) => print(l, 'success'))
      }
      return
    }

    const selectMatch = q.match(
      /SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER BY\s+(\w+(?:\s+(?:ASC|DESC))?))?(?:\s+LIMIT\s+(\d+))?$/i,
    )
    if (!selectMatch) {
      print('Invalid query syntax. Type HELP for available commands.', 'error')
      return
    }

    const columns = (selectMatch[1] || '*').trim()
    const tableName = selectMatch[2] || ''
    const whereClause = selectMatch[3] || ''
    const orderClause = selectMatch[4] || ''
    const limitStr = selectMatch[5] || ''

    const tableNameLower = tableName.toLowerCase()
    const table = tables[tableNameLower]

    if (!table) {
      print(`Table '${tableName}' not found. Type TABLES to see available tables.`, 'error')
      return
    }

    let data = [...table]
    const isAllColumns = columns === '*'
    const selectedColumns = isAllColumns
      ? Object.keys(table[0])
      : columns.split(',').map((c) => c.trim().toLowerCase())

    if (whereClause) {
      data = applyWhere(data, whereClause)
    }

    if (orderClause) {
      data = applyOrderBy(data, orderClause)
    }

    if (limitStr) {
      data = applyLimit(data, parseInt(limitStr) || 10)
    }

    const rows = data.map((row) => selectedColumns.map((col) => row[col]))

    if (rows.length === 0) {
      print('No results found', 'error')
    } else {
      const lines = formatTable(selectedColumns, rows)
      lines.forEach((l) => print(l, 'success'))
    }
  } else {
    print('Unknown command. Type HELP for available commands.', 'error')
  }
}

function handleSubmit() {
  executeQuery(input.value)
  input.value = ''
  nextTick(() => {
    const container = document.querySelector('.output-area')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

function focusInput() {
  inputRef.value?.focus()
}
</script>

<template>
  <div
    class="sql-viewer h-full flex flex-col bg-gray-900 rounded-lg overflow-hidden"
    @click="focusInput"
  >
    <div class="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
      <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span class="text-gray-300 text-sm font-mono">SQL Query Terminal</span>
    </div>

    <div class="output-area flex-1 p-4 overflow-y-auto font-mono text-sm space-y-1">
      <div class="text-green-400 mb-4">
        <p class="text-lg">SQL Terminal v1.0</p>
        <p class="text-gray-500 text-xs">Type HELP for available commands or TABLES to see data</p>
      </div>

      <div v-for="(line, index) in output" :key="index">
        <pre
          class="whitespace-pre-wrap break-all"
          :class="{
            'text-gray-400': !line.startsWith('❌') && !line.startsWith('✅'),
            'text-red-400': line.startsWith('❌'),
            'text-green-400': line.startsWith('✅'),
            'text-blue-400': line.startsWith('>'),
            'text-yellow-400': line.includes('Available') || line.includes('└─'),
          }"
          >{{ line }}</pre
        >
      </div>
    </div>

    <div class="border-t border-gray-700 p-3 bg-gray-800">
      <div class="flex items-center gap-2">
        <span class="text-green-400 flex-shrink-0 text-sm">></span>
        <input
          ref="inputRef"
          v-model="input"
          @keydown.enter="handleSubmit"
          type="text"
          placeholder="Enter SQL query..."
          class="flex-1 bg-transparent text-gray-100 outline-none font-mono text-sm placeholder-gray-500"
          autocomplete="off"
          spellcheck="false"
        />
        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
