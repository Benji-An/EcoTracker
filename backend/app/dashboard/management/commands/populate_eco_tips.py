from django.core.management.base import BaseCommand
from app.dashboard.models import EcoTip
from app.dashboard.eco_tips_data import ECO_TIPS


class Command(BaseCommand):
    help = 'Poblar la base de datos con eco tips iniciales'

    def handle(self, *args, **options):
        self.stdout.write('Poblando eco tips...')
        
        created_count = 0
        existing_count = 0
        
        for tip_data in ECO_TIPS:
            tip, created = EcoTip.objects.get_or_create(
                title=tip_data['title'],
                defaults={
                    'description': tip_data['description'],
                    'category': tip_data['category'],
                    'icon': tip_data['icon'],
                    'is_active': True
                }
            )
            
            if created:
                created_count += 1
                self.stdout.write(self.style.SUCCESS(f'✓ Creado: {tip.title}'))
            else:
                existing_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'\n✓ Proceso completado:'))
        self.stdout.write(self.style.SUCCESS(f'  - {created_count} tips creados'))
        self.stdout.write(self.style.SUCCESS(f'  - {existing_count} tips ya existían'))
        self.stdout.write(self.style.SUCCESS(f'  - Total en DB: {EcoTip.objects.count()}'))
