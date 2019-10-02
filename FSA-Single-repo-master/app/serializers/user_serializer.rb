class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :balance, :transactions,

  def transactions
    object.transactions.map { |transaction|
      {
        ticker_symbol: transaction.stock.ticker_symbol,
        stock_price: transaction.stock_price,
        shares: transaction.shares,
        transactions_type: transaction.transactions_type
      }

    }
  end
end
