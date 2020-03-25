class CreateCars < ActiveRecord::Migration[5.2]
  def change
    create_table :cars do |t|
      t.string :vin
      t.string :model
      t.string :color
      t.integer :mileage
      t.date :purchased_date

      t.timestamps
    end
  end
end
