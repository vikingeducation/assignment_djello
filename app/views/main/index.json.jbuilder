json.board do 
  json.id @current_board.id
  json.title @current_board.title
  json.list_ids @current_board.list_ids
  json.board_members @current_board.board_members do |m|
    json.id m.id
    json.name m.full_name
  end
  json.board_list do 
  json.array! @user.all_boards.sort_by(&:title), :id, :title
end
end



json.lists @current_board.lists, :id, :title, :description, :board_id, :card_ids

json.cards @current_board.cards, :id, :title, :member_ids, :position


json.users User.all do |u|
  json.id u.id
  json.name u.full_name
end 



