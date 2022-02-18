import { IEmailTemplate } from "../i-email-template";
import { INeverLoadPlanningEmailData } from "./i-never-load-planning";

export class NeverLoadPlanningEmail implements IEmailTemplate<INeverLoadPlanningEmailData> {

    public constructor(
        public readonly data: INeverLoadPlanningEmailData,
    ) { }

    public html(): string {
        return `
        <div class="Pagina"
    style="max-width: 600px; padding: 90px; margin: auto; border-collapse: collapse; background-color:#f4ab14 ; box-shadow: 0px 35px #003f72 inset, 0px -35px #003f72 inset;">

    <tr>
        <td style=" text-align: left; padding: 0;">
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center"> <img
                class="max-width" border="0"
                style="display: flexbox; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px;"
                width="300" src="https://www.utpl.edu.ec/manual_imagen/images/institucional/UTPL-INSTITUCIONAL-FC.jpg"
                alt="" height="" data-proportionally-constrained="false" data-responsive="false"> </td>
        <div> <span style="font-size:18px;"> <strong>Vicerrectorado Académico</strong> </span> <br> 
                <strong>Docente Integrador</strong> </div>
        <div style="font-family: inherit; text-align: inherit"> <br> </div>
        <div style="font-family: inherit; text-align: inherit"> <span
                style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400">
                Hola, ${this.data.displayName} </span> </div>
        <div style="font-family: inherit; text-align: inherit"> <br> </div>
        <div style="font-family: inherit; text-align: inherit"> <span
                style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400">
                Reciba un cordial saludo de parte del Equipo del Proyecto Docente Integrador; el presente correo, 
                tiene la finalidad de recordar a usted, que su Planificación correspondiente al rol de Docente Integrador 
                no ha sido cargada al Sistema.<br><br>
            
                De antemano, hacemos llegar nuestros agradecimientos, seguros de contar con su valiosa colaboración para 
                el cumplimiento de los objetivos planteados en el marco del proyecto.<br><br>

                Para dirigirse al Sistema Docente Integrador, ingrese en el botón a continuación, en el cual deberá 
                registrarse con su usuario y contraseña del correo institucional UTPL.</span><br>             <span
                style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400">
  
        <td align="center" bgcolor="#007bff" class="inner-td"
            style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"> <br><a
                style="background-color:#003f72; border:1px solid #003f72; border-color: #003f72; border-radius:6px; border-width:1px; color:#ffffff; display:inline-block; font-family:arial,helvetica,sans-serif; font-size:16px; font-weight:normal; letter-spacing:0px; line-height:16px; padding:12px 18px 12px 18px; text-align:center; text-decoration:none; border-style:solid;"
                href="${this.data.redirectUrl}"
                target="_blank"> Sistema Docente Integrador </a> </td>
        <div style="font-family: inherit; text-align: inherit"> <br>

        </div>
        <div style="font-family: inherit; text-align: inherit"> <br> </div>
        <div> La información de este correo ha sido generada automáticamente por el Sistema del Proyecto Docente Integrador. 
            Si tiene alguna duda, sugerencia o se presentó algún inconveniente, puede contactarse al correo electrónico 
                <strong>bigomez@utpl.edu.ec</strong>
        </div><br>
        <div style="font-family: inherit; text-align: inherit"> <span
            style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400">
            Atentamente, el Equipo Docente Integrador. </span> </div>
        </td>
    </tr>

</div>
            `
    }



}
