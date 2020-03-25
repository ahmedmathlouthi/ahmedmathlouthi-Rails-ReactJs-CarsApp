class RemoveTaskFromCars < ActiveRecord::Migration[5.2]
  def change
    remove_reference :cars, :task, foreign_key: true
  end
end
