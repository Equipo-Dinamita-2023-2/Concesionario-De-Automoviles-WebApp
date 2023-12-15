from django.db import models

# Create your models here.


class Sucursal(models.Model):
    id_sucursal = models.AutoField(primary_key=True)
    ciudad = models.CharField(max_length=20)
    direccion = models.CharField(max_length=50)
    celular = models.CharField(max_length=10)
    fijo = models.CharField(max_length=10)
    correo = models.CharField(max_length=50)

    # Mostrar en Django Admin
    def __str__(self):
        return f"{self.ciudad} - {self.direccion}"


class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    documento = models.CharField(max_length=10, unique=True)
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    celular = models.CharField(max_length=10, unique=True)
    correo = models.CharField(max_length=50, unique=True)
    direccion = models.CharField(max_length=50)
    ciudad = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.id_cliente} {self.nombres}"


class RolEmpleado(models.Model):
    id_rol = models.AutoField(primary_key=True)
    tipo_rol = models.CharField(max_length=15)

    # Mostrar en Django Admin
    def __str__(self):
        return self.tipo_rol


class Empleado(models.Model):
    id_empleado = models.AutoField(primary_key=True)
    documento = models.CharField(max_length=10, unique=True)
    nombres = models.CharField(max_length=30)
    apellidos = models.CharField(max_length=30)
    celular = models.CharField(max_length=10, unique=True)
    correo = models.CharField(max_length=50, unique=True)
    contrasenha = models.CharField(max_length=20)
    direccion = models.CharField(max_length=30)
    ciudad = models.CharField(max_length=15)
    id_rol = models.ForeignKey(RolEmpleado, on_delete=models.CASCADE)
    id_sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.id_empleado} {self.nombres}"


class TipoVehiculo(models.Model):
    id_tipo_vehiculo = models.AutoField(primary_key=True)
    marca = models.CharField(max_length=15)
    modelo = models.CharField(max_length=10)
    anho = models.CharField(max_length=4)
    color = models.CharField(max_length=10)
    stock = models.IntegerField()
    precio = models.IntegerField()

    # Mostrar en Django Admin
    def __str__(self):
        return f"{self.marca} {self.modelo} "


class Vehiculo(models.Model):
    placa = models.CharField(max_length=6, primary_key=True)
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)
    tipo_uso = models.CharField(max_length=10)
    url = models.CharField(max_length=500)

    # Mostrar en Django Admin
    def __str__(self):
        return f"{self.placa} - {self.id_tipo_vehiculo}"


class Repuesto(models.Model):
    id_repuesto = models.AutoField(primary_key=True)
    nombre_repuesto = models.CharField(max_length=50)
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)
    stock = models.IntegerField()
    precio = models.IntegerField()
    url = models.CharField(max_length=500)
    descripcion = models.CharField(max_length=500)

    # Mostrar en Django Admin
    def __str__(self):
        return f"{self.nombre_repuesto} {self.id_tipo_vehiculo}"


class Cotizacion(models.Model):
    id_cotizacion = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    id_empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    fecha_cotizacion = models.DateField()
    dias_vigente = models.IntegerField()
    precio_cotizado = models.IntegerField()
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)

    # Mostrar en Django Admin
    def __str__(self):
        return f"{self.id_cotizacion} {self.id_cliente} {self.placa} {self.precio_cotizado}"


class Venta(models.Model):
    id_venta = models.AutoField(primary_key=True)
    id_empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    id_cotizacion = models.ForeignKey(Cotizacion, on_delete=models.CASCADE)
    fecha_venta = models.DateField()
    precio_venta = models.IntegerField()
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)

    # Mostrar en Django Admin
    def __str__(self):
        return f"{self.id_venta} {self.id_empleado} {self.placa} {self.precio_venta}"


class OrdenReparacion(models.Model):
    id_reparacion = models.AutoField(primary_key=True)
    id_cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    cod_cliente = models.CharField(max_length=10)
    placa = models.ForeignKey(Vehiculo, on_delete=models.CASCADE)
    fecha_ingreso = models.DateField()
    id_tipo_vehiculo = models.ForeignKey(
        TipoVehiculo, on_delete=models.CASCADE)
    id_empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    lista_repuestos = models.CharField(max_length=500)
    costo_repuestos = models.IntegerField()
    costo_trabajo = models.IntegerField()
    costo_total = models.IntegerField()
    estado_pago = models.CharField(max_length=10)
    estado_reparacion = models.CharField(max_length=20)
    descripcion_trabajo = models.CharField(max_length=500)

    # Mostrar en Django Admin
    def __str__(self):
        return f"{self.id_reparacion} {self.id_empleado} {self.id_cliente} {self.placa}"


class RepuestosOrdenes(models.Model):
    id_reparacion = models.ForeignKey(
        OrdenReparacion, on_delete=models.CASCADE)
    id_repuesto = models.ForeignKey(
        Repuesto, on_delete=models.CASCADE)
