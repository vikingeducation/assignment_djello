json.card_id @membership.card_id
json.member_id @membership.user_id
json.activities @membership.card.activities, :id, :value, :object, :card_id, :user_id, :verb, :created_at.to_s