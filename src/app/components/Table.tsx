import React from 'react'

import styles from './Table.module.css'

interface TableProps {
    children: React.ReactNode,
    columns: string[]
}

export function Table ({ children, columns }: TableProps) {
  return (
    <div className={styles.tableContainer}>
      <table className='w-full bg-white shadow rounded-md'>
        <thead>
          <tr className='bg-blue-600 text-white'>
            {columns.map((column, index) => (<th key={index} className='py-2 px-4'>{column}</th>))}
            <th className='py-2 px-4'>Options</th>
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
}
