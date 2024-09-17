# activities = @card.activities.sort{ |a, b| b.created_at <=> a.created_at}

json.id @card.id
json.title @card.title
json.description @card.description
json.list_id @card.list_id
json.position @card.position
json.member_ids @card.member_ids

json.activities @card.activities, :id, :value, :object, :card_id, :user_id, :verb, :created_at.to_s
