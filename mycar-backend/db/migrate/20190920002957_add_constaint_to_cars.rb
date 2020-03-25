class AddConstaintToCars < ActiveRecord::Migration[5.2]
  def change
    add_index :cars, :vin, :unique => true
  end
end
