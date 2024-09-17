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

ActiveRecord::Schema.define(version: 20171113072748) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "activities", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "card_id",    null: false
    t.string   "object",     null: false
    t.string   "value"
    t.string   "verb",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_activities_on_card_id", using: :btree
    t.index ["user_id"], name: "index_activities_on_user_id", using: :btree
  end

  create_table "board_memberships", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "board_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_board_memberships_on_board_id", using: :btree
    t.index ["user_id"], name: "index_board_memberships_on_user_id", using: :btree
  end

  create_table "boards", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_boards_on_user_id", using: :btree
  end

  create_table "cards", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "list_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "position"
    t.index ["list_id"], name: "index_cards_on_list_id", using: :btree
  end

  create_table "lists", force: :cascade do |t|
    t.string   "title"
    t.text     "description"
    t.integer  "board_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["board_id"], name: "index_lists_on_board_id", using: :btree
  end

  create_table "memberships", force: :cascade do |t|
    t.integer  "card_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["card_id"], name: "index_memberships_on_card_id", using: :btree
    t.index ["user_id"], name: "index_memberships_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_foreign_key "activities", "cards"
  add_foreign_key "activities", "users"
  add_foreign_key "board_memberships", "boards"
  add_foreign_key "board_memberships", "users"
  add_foreign_key "boards", "users"
  add_foreign_key "cards", "lists"
  add_foreign_key "lists", "boards"
  add_foreign_key "memberships", "cards"
  add_foreign_key "memberships", "users"
end
