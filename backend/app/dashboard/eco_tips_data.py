"""
Script para poblar la base de datos con eco tips iniciales
"""

ECO_TIPS = [
    # Comidas
    {
        'title': 'Reduce el consumo de carne',
        'description': 'Sustituir una comida de carne a la semana puede ahorrar hasta 180 kg de CO2 al año. Prueba con legumbres o tofu.',
        'category': 'meals',
        'icon': 'Salad'
    },
    {
        'title': 'Elige productos locales',
        'description': 'Los alimentos locales generan hasta 5 veces menos emisiones que los importados. ¡Apoya a los productores de tu región!',
        'category': 'meals',
        'icon': 'ShoppingBasket'
    },
    {
        'title': 'Aprovecha las sobras',
        'description': 'Un tercio de los alimentos se desperdicia. Planifica tus comidas y aprovecha las sobras para nuevas recetas.',
        'category': 'meals',
        'icon': 'ChefHat'
    },
    {
        'title': 'Come más vegetales',
        'description': 'Las verduras y frutas tienen una huella de carbono 10 veces menor que la carne. Haz que sean la estrella de tu plato.',
        'category': 'meals',
        'icon': 'Apple'
    },
    {
        'title': 'Evita el desperdicio de comida',
        'description': 'Congela lo que no vas a usar pronto y utiliza las cáscaras para hacer caldos. ¡Cero desperdicio!',
        'category': 'meals',
        'icon': 'Refrigerator'
    },
    
    # Transporte
    {
        'title': 'Camina distancias cortas',
        'description': 'Para trayectos menores a 2 km, caminar es más rápido que buscar estacionamiento y mucho más saludable.',
        'category': 'transport',
        'icon': 'FootPrints'
    },
    {
        'title': 'Usa la bicicleta',
        'description': 'La bici es 10 veces más eficiente que el auto. Además, ahorras dinero y haces ejercicio.',
        'category': 'transport',
        'icon': 'Bike'
    },
    {
        'title': 'Comparte el auto',
        'description': 'El carpooling reduce las emisiones hasta un 75%. Además, compartes gastos y haces el viaje más ameno.',
        'category': 'transport',
        'icon': 'Users'
    },
    {
        'title': 'Usa transporte público',
        'description': 'Un bus puede reemplazar 40 autos en la carretera. Es la opción más sostenible para distancias largas.',
        'category': 'transport',
        'icon': 'Bus'
    },
    {
        'title': 'Planifica tus viajes',
        'description': 'Agrupa tus diligencias para reducir viajes innecesarios. Cada kilómetro evitado cuenta.',
        'category': 'transport',
        'icon': 'MapPin'
    },
    {
        'title': 'Mantén tu vehículo',
        'description': 'Un auto bien mantenido consume hasta 10% menos combustible. Revisa la presión de las llantas regularmente.',
        'category': 'transport',
        'icon': 'Wrench'
    },
    
    # Energía
    {
        'title': 'Apaga las luces',
        'description': 'Apagar las luces cuando sales de una habitación puede ahorrar hasta 15% en tu factura eléctrica.',
        'category': 'energy',
        'icon': 'Lightbulb'
    },
    {
        'title': 'Usa LED',
        'description': 'Las bombillas LED consumen 80% menos energía y duran 25 veces más que las incandescentes.',
        'category': 'energy',
        'icon': 'Zap'
    },
    {
        'title': 'Desconecta aparatos',
        'description': 'Los aparatos en standby consumen hasta el 10% de tu electricidad. Usa regletas con interruptor.',
        'category': 'energy',
        'icon': 'Power'
    },
    {
        'title': 'Aprovecha la luz natural',
        'description': 'Abre cortinas y persianas durante el día. La luz natural es gratis y mejora tu estado de ánimo.',
        'category': 'energy',
        'icon': 'Sun'
    },
    {
        'title': 'Ajusta el termostato',
        'description': 'Bajar 1°C la calefacción o subir 1°C el aire acondicionado ahorra hasta 10% de energía.',
        'category': 'energy',
        'icon': 'Thermometer'
    },
    {
        'title': 'Seca la ropa al aire',
        'description': 'Las secadoras son uno de los electrodomésticos que más energía consumen. El sol es gratis.',
        'category': 'energy',
        'icon': 'Wind'
    },
    
    # Agua
    {
        'title': 'Cierra el grifo',
        'description': 'Cerrar el grifo al cepillarte los dientes ahorra hasta 12 litros de agua por minuto.',
        'category': 'water',
        'icon': 'Droplet'
    },
    {
        'title': 'Duchas más cortas',
        'description': 'Reducir la ducha en 2 minutos ahorra 20 litros de agua. Usa un temporizador si es necesario.',
        'category': 'water',
        'icon': 'Timer'
    },
    {
        'title': 'Repara fugas',
        'description': 'Un grifo que gotea puede desperdiciar 30 litros al día. Repáralo cuanto antes.',
        'category': 'water',
        'icon': 'Wrench'
    },
    {
        'title': 'Reutiliza el agua',
        'description': 'Usa el agua de lavar verduras para regar las plantas. Cada gota cuenta.',
        'category': 'water',
        'icon': 'Recycle'
    },
    {
        'title': 'Lava con carga completa',
        'description': 'Espera a tener la lavadora o lavavajillas lleno. Ahorras agua, energía y detergente.',
        'category': 'water',
        'icon': 'Waves'
    },
    
    # Residuos
    {
        'title': 'Separa tus residuos',
        'description': 'Separar orgánicos, reciclables y no reciclables facilita el reciclaje y reduce la contaminación.',
        'category': 'waste',
        'icon': 'Trash2'
    },
    {
        'title': 'Lleva tu propia bolsa',
        'description': 'Una bolsa reutilizable puede reemplazar 1000 bolsas plásticas durante su vida útil.',
        'category': 'waste',
        'icon': 'ShoppingBag'
    },
    {
        'title': 'Di no al plástico de un solo uso',
        'description': 'Usa botellas, vasos y cubiertos reutilizables. El plástico tarda 500 años en degradarse.',
        'category': 'waste',
        'icon': 'Ban'
    },
    {
        'title': 'Composta tus residuos orgánicos',
        'description': 'La composta reduce hasta 50% tu basura y crea abono natural para plantas.',
        'category': 'waste',
        'icon': 'Sprout'
    },
    {
        'title': 'Compra a granel',
        'description': 'Los productos a granel reducen el empaque hasta 90%. Usa tus propios contenedores.',
        'category': 'waste',
        'icon': 'Package'
    },
    {
        'title': 'Repara antes de tirar',
        'description': 'Muchas cosas pueden repararse. Dale una segunda vida a tus objetos antes de desecharlos.',
        'category': 'waste',
        'icon': 'Tool'
    },
    
    # General
    {
        'title': '¡Cada acción cuenta!',
        'description': 'No necesitas ser perfecto. Pequeños cambios consistentes generan un gran impacto colectivo.',
        'category': 'general',
        'icon': 'Heart'
    },
    {
        'title': 'Inspira a otros',
        'description': 'Comparte tus logros eco-amigables con amigos y familia. El cambio es contagioso.',
        'category': 'general',
        'icon': 'Users'
    },
    {
        'title': 'Aprende continuamente',
        'description': 'La sostenibilidad evoluciona. Mantente informado sobre nuevas formas de reducir tu huella.',
        'category': 'general',
        'icon': 'BookOpen'
    },
    {
        'title': 'Apoya negocios sostenibles',
        'description': 'Tu poder adquisitivo es tu voto. Prefiere empresas con prácticas ambientales responsables.',
        'category': 'general',
        'icon': 'Store'
    },
    {
        'title': 'Calcula tu huella',
        'description': 'Conocer tu impacto es el primer paso. Usa esta app para monitorear y reducir tus emisiones.',
        'category': 'general',
        'icon': 'BarChart'
    },
]
