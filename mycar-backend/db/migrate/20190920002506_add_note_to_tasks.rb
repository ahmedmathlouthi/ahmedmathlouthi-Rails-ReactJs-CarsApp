class AddNoteToTasks < ActiveRecord::Migration[5.2]
  def change
    add_reference :tasks, :note, foreign_key: true
  end
end
