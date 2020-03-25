class AddCarToTasks < ActiveRecord::Migration[5.2]
  def change
    add_reference :tasks, :car, foreign_key: true
    add_foreign_key :tasks, :car
  end
end
