import { IEmailTemplate } from "../i-email-template";
import { ISendEvidenceEmailData } from "./i-send-evidence-email-data";

export class SendEvidenceEmail implements IEmailTemplate<ISendEvidenceEmailData>{

    public constructor(
        public readonly data: ISendEvidenceEmailData,
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
                    ¡Felicitaciones! , ${this.data.teacherName} </span> </div>
            <div style="font-family: inherit; text-align: inherit"> <br> </div>
            <div style="font-family: inherit; text-align: inherit"> <span
                    style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400">
                    La actividad denominada <b>${this.data.activityName}</b>, ha sido ejecutada exitosamente, de acuerdo a la planificación previamente establecida.  <br><br>
    
                    Gracias por el compromiso demostrado como Docente Integrador, le motivamos a continuar de esta manera, seguros de que el esfuerzo plasmado nos permitirá conseguir los objetivos planteados dentro del proyecto. <br><br>
    
                    </span>             <span
                    style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400">
            
            <div style="font-family: inherit; text-align: inherit"> <span
                    style="color: #222222; font-family: Arial, Helvetica, sans-serif; font-size: 18px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400">
                    Atentamente, el Equipo Docente Integrador. </span> </div>
            </td>
        </tr>
    
    </div>
    `
    }

}
