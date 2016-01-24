FactoryGirl.define do

  factory :user, aliases: [:owner, :member] do
    sequence(:email) { |n| "testuser#{n}@test.com" }
    password 'password'
    password_confirmation 'password'
    username 'testuser'
  end

end
