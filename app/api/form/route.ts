import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    });

    const {
      nombre,
      nivel,
      asignaturas,
      colegio,
      edad,
      frecuenciaUso,
      herramientasUsadas,
      herramientaAprender,
      areaCapacitacion,
      preferenciaCapacitacion,
    } = body;

    await connection.execute(
      `INSERT INTO formularios_diagnostico (
        nombre,
        nivel,
        asignaturas,
        colegio,
        edad,
        frecuencia_uso,
        herramientas_usadas,
        herramienta_aprender,
        area_capacitacion,
        preferencia_capacitacion
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombre || null,
        JSON.stringify(nivel),
        asignaturas,
        colegio || null,
        edad || null,
        frecuenciaUso,
        JSON.stringify(herramientasUsadas),
        herramientaAprender,
        areaCapacitacion,
        preferenciaCapacitacion,
      ]
    );

    await connection.end();

    return NextResponse.json({ message: "Formulario guardado con éxito" });
  } catch (error) {
    console.error("Error al guardar el formulario:", error);
    return NextResponse.json(
      { error: "Error al guardar el formulario" },
      { status: 500 }
    );
  }
}
