# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


p "deleting everything....."
User.destroy_all
Board.destroy_all
List.destroy_all


p 'creating users.....'

def create_user
  User.create(
    email: Faker::Internet.email,
    username: Faker::Internet.user_name,
    password: 'password')
end

10.times do 
  create_user
end

User.create(email: 'a@admin.com', password: 'password', username: 'admin')






p "creating boards..."

def create_board(user_id)
  Board.create(title: Faker::Commerce.product_name, description: Faker::Hipster.sentence, user_id: user_id)
end


User.all.each do |user|
  2.times do
    create_board(user.id)
  end
end



p "creating lists..."

def create_list(board_id)
  List.create(title: Faker::Hipster.word, description: Faker::Hipster.sentence, board_id: board_id)
end

Board.all.each do |board|
  3.times do
    create_list(board.id)
  end
end



p "creating cards..."

def create_card(list_id)
  Card.create(title: Faker::Hipster.word, description: Faker::Hipster.sentence, list_id: list_id, completed: false)
end

List.all.each do |list|
  3.times do 
    create_card(list.id)
  end
end






p "DONE"