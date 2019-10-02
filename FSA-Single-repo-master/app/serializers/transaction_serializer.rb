class TransactionSerializer < ActiveModel::Serializer
  attributes :stock_price, :shares, :transactions_type, :ticker_symbol

  def ticker_symbol
    object.stock.ticker_symbol
  end

end
