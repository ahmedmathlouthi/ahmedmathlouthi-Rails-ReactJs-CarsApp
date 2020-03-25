class AddTaskToCars < ActiveRecord::Migration[5.2]
  def change
    add_reference :cars, :task, foreign_key: true
  end
end
