class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.string :ticker_symbol
      t.float  :stock_price
      t.integer :shares
      t.integer :user_id
      t.timestamps
    end
  end
end
