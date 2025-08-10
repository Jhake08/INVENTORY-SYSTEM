import React from 'react'
import Link from 'next/link'

const Sidebar = () => {
  return React.createElement(
    'aside',
    { className: 'w-64 h-full bg-black text-white flex flex-col shadow-lg' },
    React.createElement(
      'div',
      { className: 'p-6 text-3xl font-extrabold tracking-wide border-b border-gray-800' },
      'Inventory System'
    ),
    React.createElement(
      'nav',
      { className: 'flex-1 p-6 space-y-4 text-lg font-semibold' },
      React.createElement(
        Link,
        { href: '/', legacyBehavior: true },
        React.createElement(
          'a',
          { className: 'block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300' },
          'Dashboard'
        )
      ),
      React.createElement(
        Link,
        { href: '/products', legacyBehavior: true },
        React.createElement(
          'a',
          { className: 'block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300' },
          'Products'
        )
      ),
      React.createElement(
        Link,
        { href: '/transactions', legacyBehavior: true },
        React.createElement(
          'a',
          { className: 'block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300' },
          'Transactions'
        )
      ),
      React.createElement(
        Link,
        { href: '/reports', legacyBehavior: true },
        React.createElement(
          'a',
          { className: 'block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300' },
          'Reports'
        )
      ),
      React.createElement(
        Link,
        { href: '/settings', legacyBehavior: true },
        React.createElement(
          'a',
          { className: 'block px-4 py-3 rounded-lg hover:bg-gray-900 transition duration-300' },
          'Settings'
        )
      )
    )
  )
}

export default Sidebar
