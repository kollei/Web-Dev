class Animal:
    def __init__(self, name, age, color):
        self.name = name
        self.age = age
        self.color = color

    def speak(self):
        return "Some sound"

    def move(self):
        return "Moving"

    def __str__(self):
        return f"{self.name} ({self.age}, {self.color})"


class Dog(Animal):
    def __init__(self, name, age, color):
        super().__init__(name, age, color)

    def speak(self):
        return "Woof"

    def barking(self):
        return "BRRR"


class Cat(Animal):
    def __init__(self, name, age, color):
        super().__init__(name, age, color)

    def speak(self):
        return "Meow"
    
    def purr(self):
        return "MRRR"