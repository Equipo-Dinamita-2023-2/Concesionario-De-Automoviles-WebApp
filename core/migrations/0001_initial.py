# Generated by Django 4.2.5 on 2023-11-11 22:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cliente',
            fields=[
                ('id_cliente', models.AutoField(primary_key=True, serialize=False)),
                ('documento', models.CharField(max_length=10)),
                ('nombres', models.CharField(max_length=30)),
                ('apellidos', models.CharField(max_length=30)),
                ('celular', models.CharField(max_length=10)),
                ('correo', models.CharField(max_length=30)),
                ('direccion', models.CharField(max_length=30)),
                ('ciudad', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Empleado',
            fields=[
                ('id_empleado', models.AutoField(primary_key=True, serialize=False)),
                ('documento', models.CharField(max_length=10)),
                ('nombres', models.CharField(max_length=30)),
                ('apellidos', models.CharField(max_length=30)),
                ('celular', models.CharField(max_length=10)),
                ('correo', models.CharField(max_length=30)),
                ('contrasenha', models.CharField(max_length=20)),
                ('direccion', models.CharField(max_length=30)),
                ('ciudad', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='RolEmpleado',
            fields=[
                ('id_rol', models.AutoField(primary_key=True, serialize=False)),
                ('tipo_rol', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Sucursal',
            fields=[
                ('id_sucursal', models.AutoField(primary_key=True, serialize=False)),
                ('ciudad', models.CharField(max_length=20)),
                ('direccion', models.CharField(max_length=30)),
                ('celular', models.CharField(max_length=10)),
                ('fijo', models.CharField(max_length=10)),
                ('correo', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='TipoVehiculo',
            fields=[
                ('id_tipo_vehiculo', models.AutoField(primary_key=True, serialize=False)),
                ('marca', models.CharField(max_length=15)),
                ('modelo', models.CharField(max_length=10)),
                ('anho', models.CharField(max_length=4)),
                ('color', models.CharField(max_length=10)),
                ('stock', models.IntegerField()),
                ('precio', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Vehiculo',
            fields=[
                ('placa', models.CharField(max_length=6, primary_key=True, serialize=False)),
                ('disponibilidad_color', models.BooleanField()),
                ('disponibilidad_precio', models.BooleanField()),
                ('id_tipo_vehiculo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.tipovehiculo')),
            ],
        ),
        migrations.CreateModel(
            name='Venta',
            fields=[
                ('id_venta', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_venta', models.DateField()),
                ('descripcion_venta', models.CharField(max_length=50)),
                ('id_empleado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.empleado')),
                ('id_tipo_vehiculo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.tipovehiculo')),
                ('placa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.vehiculo')),
            ],
        ),
        migrations.CreateModel(
            name='Repuesto',
            fields=[
                ('id_repuesto', models.AutoField(primary_key=True, serialize=False)),
                ('stock', models.IntegerField()),
                ('precio', models.IntegerField()),
                ('descripcion', models.CharField(max_length=50)),
                ('id_tipo_vehiculo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.tipovehiculo')),
            ],
        ),
        migrations.CreateModel(
            name='OrdenReparacion',
            fields=[
                ('id_reparacion', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_ingreso', models.DateField()),
                ('repuestos', models.CharField(max_length=50)),
                ('estado_vehiculo', models.CharField(max_length=50)),
                ('descripcion_trabajo', models.CharField(max_length=100)),
                ('estado_reparacion', models.BooleanField()),
                ('id_cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.cliente')),
                ('id_empleado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.empleado')),
                ('id_tipo_vehiculo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.tipovehiculo')),
                ('placa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.vehiculo')),
            ],
        ),
        migrations.AddField(
            model_name='empleado',
            name='id_rol',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.rolempleado'),
        ),
        migrations.AddField(
            model_name='empleado',
            name='id_sucursal',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.sucursal'),
        ),
        migrations.CreateModel(
            name='Cotizacion',
            fields=[
                ('id_cotizacion', models.AutoField(primary_key=True, serialize=False)),
                ('fecha_cotizacion', models.DateField()),
                ('dias_vigente', models.IntegerField()),
                ('descripcion_cotizacion', models.CharField(max_length=50)),
                ('id_cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.cliente')),
                ('id_tipo_vehiculo', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.tipovehiculo')),
                ('placa', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.vehiculo')),
            ],
        ),
    ]
