# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_25_151713) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cars", force: :cascade do |t|
    t.string "model"
    t.string "color"
    t.integer "mileage"
    t.date "purchased_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "vin"
    t.index ["vin"], name: "index_cars_on_vin", unique: true
  end

  create_table "notes", force: :cascade do |t|
    t.string "requirement"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "task_id"
    t.index ["task_id"], name: "index_notes_on_task_id"
  end

  create_table "tasks", force: :cascade do |t|
    t.string "issue"
    t.string "status", default: "Not Done"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "note_id"
    t.bigint "car_id"
    t.index ["car_id"], name: "index_tasks_on_car_id"
    t.index ["note_id"], name: "index_tasks_on_note_id"
  end

  add_foreign_key "notes", "tasks"
  add_foreign_key "tasks", "cars"
  add_foreign_key "tasks", "notes"
end
