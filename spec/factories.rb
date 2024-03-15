FactoryBot.define do
  factory :activity do
    association :user
    association :card
    sequence(:verb){ |n| "Verb #{n}"}
    sequence(:object){|n| "Object #{n}"}

    trait :missing_verb do
      verb nil
    end

    trait :missing_object do
      object nil
    end

  end

  factory :board_membership do
    association :user
    association :board
  end

  factory :membership do
    association :card
    association :user
  end
  factory :card do
    sequence(:title){|n| "Card title #{n}"}
    sequence(:description){|n| "Card description #{n}"}
    association :list
  end

  factory :list do
    sequence(:title){|n| "List title #{n}"}
    sequence(:description){ |n| "List description #{n}"}
    association :board
  end

  factory :board do
    sequence(:title){|n| "Board Title #{n}"}
    association :owner

    trait :no_title do
      title nil
    end
  end

  factory :user, aliases: [:owner] do
    sequence(:email){|n| "foo#{n}@bar.com"}
    password "password!'
    first_name Faker::Name.first_name
    last_name Faker::Name.last_name
  end
end
