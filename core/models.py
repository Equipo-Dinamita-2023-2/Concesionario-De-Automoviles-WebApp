from django.db import models

# Create your models here.


class Sucursal(models.Model):
    id_sucursal = models.AutoField(primary_key=True)
    ciudad = models.CharField(max_length=20)
    direccion = models.CharField(max_length=30)
    celular = models.CharField(max_length=10)
    fijo = models.CharField(max_length=10)
    correo = models.CharField(max_length=30)

    # Mostrar en Django Admin
    def __str__(self):
        return self.direccion


class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    documento = models.CharField(max_length=10)
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    celular = models.CharField(max_length=10)
    correo = models.CharField(max_length=30)
    direccion = models.CharField(max_length=30)
    ciudad = models.CharField(max_length=15)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class RolEmpleado(models.Model):
    id_rol = models.AutoField(primary_key=True)
    tipo_rol = models.CharField(max_length=10)

    # Mostrar en Django Admin
    def __str__(self):
        return self.tipo_rol


class Empleado(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    documento = models.CharField(max_length=10)
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    celular = models.CharField(max_length=10)
    correo = models.CharField(max_length=30)
    contrasenha = models.CharField(max_length=20)
    direccion = models.CharField(max_length=30)
    ciudad = models.CharField(max_length=15)
    id_rol = models.ForeignKey(RolEmpleado, on_delete=models.CASCADE)
    id_sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombres} {self.apellidos}"


class TipoVehiculo(models.Model):
    id_tipo_vehiculo = models.AutoField(primary_key=True)
    marca = models.CharField(max_length=15)
    modelo = models.CharField(max_length=10)
    anho = models.CharField(max_length=4)
    color = models.CharField(max_length=10)
    stock = models.IntegerField()
    precio = models.IntegerField()


class Vehiculo(models.Model):
    placa = models.CharField(max_length=6, primary_key=True)
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)
    disponibilidad_color = models.BooleanField()
    disponibilidad_precio = models.BooleanField()


class Repuesto(models.Model):
    id_repuesto = models.AutoField(primary_key=True)
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)
    stock = models.IntegerField()
    precio = models.IntegerField()
    descripcion = models.CharField(max_length=50)


class Cotizacion(models.Model):
    id_cotizacion = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    fecha_cotizacion = models.DateField()
    dias_vigente = models.IntegerField()
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)
    descripcion_cotizacion = models.CharField(max_length=50)


class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    id_empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    fecha_venta = models.DateField()
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)
    descripcion_venta = models.CharField(max_length=50)


class OrdenReparacion(models.Model):
    id_reparacion = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    fecha_ingreso = models.DateField()
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)
    id_empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    repuestos = models.CharField(max_length=50)
    estado_vehiculo = models.CharField(max_length=50)
    descripcion_trabajo = models.CharField(max_length=100)
    estado_reparacion = models.BooleanField()
