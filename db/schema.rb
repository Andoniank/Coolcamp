# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_10_13_161626) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "campsites", force: :cascade do |t|
    t.string "name", null: false
    t.string "location", null: false
    t.integer "acres", null: false
    t.integer "max_guests", null: false
    t.integer "daily_rates", null: false
    t.boolean "lodging", null: false
    t.boolean "rv", null: false
    t.boolean "tents", null: false
    t.text "amenities", array: true
    t.text "activities", array: true
    t.text "natural_features", array: true
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location"], name: "index_campsites_on_location", unique: true
    t.index ["name"], name: "index_campsites_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["first_name"], name: "index_users_on_first_name", unique: true
    t.index ["last_name"], name: "index_users_on_last_name", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
