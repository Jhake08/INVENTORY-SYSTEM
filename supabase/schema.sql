-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products table
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    sku TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    current_stock INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 0,
    max_stock INTEGER DEFAULT 0,
    unit_cost DECIMAL(10,2) DEFAULT 0,
    selling_price DECIMAL(10,2) DEFAULT 0,
    supplier TEXT,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Transactions table
CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    product_id TEXT REFERENCES products(id),
    product_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('purchase', 'sale', 'adjustment')),
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    user_id TEXT DEFAULT 'system',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cashflow table
CREATE TABLE cashflow (
    id TEXT PRIMARY KEY,
    date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    transaction_id TEXT REFERENCES transactions(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    changes JSONB,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sync status table
CREATE TABLE sync_status (
    id INTEGER PRIMARY KEY DEFAULT 1,
    last_sync TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT single_row CHECK (id = 1)
);

-- Insert initial sync status
INSERT INTO sync_status (id, last_sync) VALUES (1, NOW());

-- Indexes for better performance
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_transactions_date ON transactions(date);
CREATE INDEX idx_transactions_product_id ON transactions(product_id);
CREATE INDEX idx_cashflow_date ON cashflow(date);
CREATE INDEX idx_cashflow_type ON cashflow(type);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
