from models import Animal, Dog, Cat

animals = [
    Animal("Animal", 5, "gray"),
    Dog("Rex", 3, "brown"),
    Cat("Milo", 2, "white")
]

dog = Dog("T", 9, "black")
print(dog)
print(dog.barking())

cat = Cat("T", 9, "black")
print(cat)
print(cat.purr())
for animal in animals:
    print(animal)
    print(animal.speak())
    print(animal.move())