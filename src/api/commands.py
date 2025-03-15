
import click
from api.models import db, User, Food, Accessories, Pet
from flask_bcrypt import Bcrypt 

bcrypt = Bcrypt()

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.name = "name"+ str(x)
            user.email = "test_user" + str(x) + "@test.com"
            user.password = bcrypt.generate_password_hash("123456").decode('utf-8') 
            user.address = "asd"
            user.phone = 12324
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert_data_catfood")
    def insert_data_catfood():
        catfood = Food()
        catfood.name = "KA AYURVEDA Only Fish Gatos Sin Gluten"
        catfood.brand="Feral"
        catfood.description = "KA AYURVEDA Only Fish es el primer pienso SIN GLUTEN y elaborado sólo con pescado azul. Alimento REALMENTE HIPOALERGÉNICO y de gran digestibilidad. Agregamos a nuestra receta un ingrediente poco conocido, como es la harina de algarroba, cuyas propiedades nutricionales, suponen toda una revolución."
        catfood.ingredients = "Salmón atlántico deshidratado e hidrolizado min. 21%, arenques deshidratados e hidrolizados 12%, anchoveta deshidratada e hidrolizada 9%, atún deshidratado e hidrolizado 6%, arroz integral, legumbre, levadura de cerveza (Saccharomyces cerevisae), aceite de salmón rico en Omega 3, harina de algarroba, Krill antártico (Euphausia Superba), complejo condroprotector (hidrocloruro de glucosamina, sulfato de condroitina), extracto de mejillón de labios verdes (Perna canaliculus), extracto de Yuca schidigera, manano-oligosacáridos, fructo-oligosacáridos, taurina (2000), caléndula, salvia, fenogreco, equinácea, eneldo, diente de león, té verde, tomillo, romero, cinc quelado, antioxidantes naturales, complejo vitamínico mineral, probióticos (E.faecium NCIMB 1041520×106 UFC), L-carnitina."
        catfood.weight = 1.5
        catfood.price = 6.42
        catfood.animal_type = "gato"
        catfood.age = "adulto"
        catfood.pathologies = "hipoalergénico"
        db.session.add(catfood)
        db.session.commit()

        catfood = Food()
        catfood.name = "Farmina Vet Life Diabetic Gato"
        catfood.brand="Farmina"
        catfood.description = "Alimento para gatos adultos que facilita el control del aporte de glucosa en los casos de diabetes mellitus."
        catfood.ingredients = "Proteína de pollo deshidratada, gluten de maíz, avena, espelta, proteína de pescado hidrolizada, grasa de pollo, fibra de guisante, proteína de pescado deshidratada, huevos desecados, aceite de pescado, pulpa de remolacha desecada, semillas de lino, cloruro de potasio, inulina, fructo-oligosacáridos, extracto de levadura (fuente de manno-oligosacáridos), cáscaras y semillas de psyllium, cloruro de sodio, citrato de potasio, sulfato de calcio dihidratado, condroitín sulfato, glucosamina. Fuentes de hidratos de carbono: avena, espelta."
        catfood.weight = 0.4
        catfood.price = 6.99
        catfood.animal_type = "gato"
        catfood.age = "adulto"
        catfood.pathologies = "diabético"

        catfood.age = ""
        catfood.pathologies = ""

        db.session.add(catfood)
        db.session.commit()

        catfood = Food()
        catfood.name = "OWNAT GF PRIME KITTEN (CAT)"
        catfood.brand="Ownat"
        catfood.description = "Comida para gatos. Indicado para gatitos de 2 a 12 meses. Con un 50% de carne fresca de pollo y pavo, ofrece un aporte de energía elevado y muy rico en proteínas de alta calidad, que garantizan su óptimo crecimiento, así como el correcto desarrollo del sistema inmunitario del gatito."
        catfood.ingredients = "Pollo fresco* (mín. 25% antes de la extrusión), pavo fresco* (mín. 25% antes de la extrusión), cerdo deshidratado (13%), guisantes enteros* (9%), grasa avícola (preservada con antioxidantes naturales), hidrolizado de salmón, pollo deshidratado (5%), raíces de mandioca* (5%), pescados deshidratados (anchoveta, jurel y caballa), patata deshidratada* (3%), huevo deshidratado* (2%), levadura de cerveza* (1%), proteína hidrolizada de pollo, manzana* (1%), aceite de pescado (preservado con antioxidantes naturales), sal gema*, fructo y manano oligosacáridos, algas marinas deshidratadas* (500 mg/kg), glucosamina (500 mg/kg), yucca schidigera, condroitín sulfato (100 mg/kg), arándanos* (100 mg/kg), tomillo* (80 mg/kg), flor de manzanilla* (80 mg/kg), hinojo* (80 mg/kg), equinácea* (80 mg/kg), té verde* (80 mg/kg).*INGREDIENTES NATURALES"
        catfood.weight = 1.
        catfood.price = 10.70
        catfood.animal_type = "gato"
        catfood.age = "cachorro"
        catfood.pathologies = ""
        db.session.add(catfood)
        db.session.commit()

        catfood = Food()
        catfood.name = "Diet Vet Renal-Oxalate pienso para gatos"
        catfood.brand="Natural Greatness"
        catfood.description = "Si tu gato padece insuficiencia renal o cardíaca crónica, es esencial proporcionarle una dieta adaptada. Natural Greatness Diet Vet Renal-Oxalate ha sido especialmente desarrollado para ayudar a la función renal y cardíaca. Este pienso dietético para gatos adultos se caracteriza por una composición equilibrada con proteínas de alta calidad y un contenido reducido de sodio y fósforo."
        catfood.ingredients = "Pollo fresco (25 %), patatas, aceite de pollo (13 %), guisantes, proteína de patata, pavo y pollo deshidratados (8 %), proteína de guisante, pulpa de remolacha, hidrolizado de hígado de pavo y pollo (2 %), pescado azul deshidratado (1,6 %), aceite de pescado azul (1,1 %), cloruro potásico, citrato de tripotasio [sustancia alcalinizante urinaria] (0,5 %), levadura de cerveza, mezcla de frutas [arándanos y pera] (0,3 %), mezcla de verduras [chirivía, laurel, perejil y diente de león] (0,3 %), huevo entero deshidratado, extracto de malta, achicoria, hidrolizado de la pared celular de la levadura (fuente de MOS), inulina (FOS), glucosamina, condroitín sulfato."
        catfood.weight = 5.
        catfood.price = 46.99
        catfood.animal_type = "gato"
        catfood.age = "senior"
        catfood.pathologies = "renal"
        db.session.add(catfood)
        db.session.commit()
        



    @app.cli.command("insert_data_dogfood")
    def insert_data_food():
        dogfood = Food()
        dogfood.name = "Special Care hepatic/renal"
        dogfood.brand="nfnatcane"
        dogfood.description = "asd"
        dogfood.ingredients = "ads"
        dogfood.price = 1.
        dogfood.pathologies = "renal"
        dogfood.animal_type = "perro"
        dogfood.age = "senior"
        dogfood.size = "medium"
        dogfood.weight = 1.
        db.session.add(dogfood)
        db.session.commit()

        dogfood = Food()
        dogfood.name = "CARE DIGESTIVE (DOG)"
        dogfood.brand="ownat"
        dogfood.description = "asd"
        dogfood.ingredients = "ads"
        dogfood.price = 1.
        dogfood.pathologies = "diabetes"
        dogfood.animal_type = "perro"
        dogfood.age = "cachorro"
        dogfood.size = "grande"
        dogfood.weight = 1.
        db.session.add(dogfood)
        db.session.commit()
      


    @app.cli.command("insert_data_exoticfood")
    def insert_data_exoticfood():
        exoticfood = Food()
        exoticfood.name = "critical care"
        exoticfood.brand="oxbow"
        exoticfood.description = "asd"
        exoticfood.ingredients = "ads"
        exoticfood.price = 1.
        exoticfood.pathologies = "asd"
        exoticfood.animal_type = "exótico"
        exoticfood.age = "asd"
        exoticfood.weight = 1.
        db.session.add(exoticfood)
        db.session.commit()


    
    @app.cli.command("insert_data_accessories")
    def insert_data_accessories():
        accessories= Accessories()
        accessories.name = "critical care"
        accessories.brand="oxbow"
        accessories.description = "asd"
        accessories.price = 1.
        accessories.animal_type = ""
        accessories.pathologies = ""
        accessories.url = ""
        db.session.add(accessories)
        db.session.commit()

    
    @app.cli.command("insert_data_pet")
    def insert_data_pet():
        pet= Pet()
        pet.name = ""
        pet.size=""
        pet.breed= "asd"
        pet.age= "cachorro"
        pet.animal_type = "gato"
        pet.pathologies="diabetes"
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "recoleto"
        pet.size="medium"
        pet.breed= "asd"
        pet.age="senior"
        pet.animal_type = "perro"
        pet.pathologies="renal"
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "peluso"
        pet.size="grande"
        pet.breed= "asd"
        pet.age="cachorro"
        pet.animal_type = "perro"
        pet.pathologies="diabetes"
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "asd"
        pet.size="oxbow"
        pet.breed= "asd"
        pet.age= "2"
        pet.animal_type = "cobaya"
        pet.pathologies="escorbuto"
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()
        
        pet= Pet()
        pet.name = "asd"
        pet.size="oxbow"
        pet.breed= "asd"
        pet.age= "60"
        pet.animal_type = "loro"
        pet.pathologies=""
        pet.user_id = 1
        db.session.add(pet)
        db.session.commit()


    

    

