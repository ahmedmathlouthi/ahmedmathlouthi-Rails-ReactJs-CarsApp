5.times do
    Car.create({
        vin: Faker::Vehicle.vin,
        model: Faker::Vehicle.model,
        color: Faker::Color.color_name,
        purchased_date: Faker::Date.backward(days: 20),
        mileage: Faker::Number.decimal_part(digits: 5),
    })
    Task.create({
        issue: Faker::Lorem.word,
        status: Faker::Lorem.word
    })
    Note.create({
        requirement: Faker::Lorem.word,
    })
  end
  