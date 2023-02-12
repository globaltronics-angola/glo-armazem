import {Component, OnInit} from '@angular/core';
import {collection, getCountFromServer, getFirestore} from "@angular/fire/firestore";
import ServiceArticles from "../../../Services/ServiceArticles";
import ServiceMovimento from "../../../Services/ServiceMovimento";
import ServiceMovimentoItems from "../../../Services/ServiceMovimentoItems";
import ServiceRequisicao from "../../../Services/ServiceRequisicao";
import ServiceTransferencia from "../../../Services/ServiceTransferencia";
import ServiceUtil from "../../../Services/ServiceUtil";
import ServiceDevolucao from "../../../Services/ServiceDevolucao";

@Component({
  selector: 'app-wdget-counter3',
  templateUrl: './wdget-counter3.component.html',
  styles: []
})
export class WdgetCounter3Component implements OnInit {

  public totalProdutos: string = "0";

  static qt: number = 0;

  static listMovimento: any[] = []
  static entrada: number = 0;
  static saida: number = 0;
  static trnasf: number = 0;
  static devolu: number = 0;

  static baixa: number = 0;
  totalEntradas: string = "";
  totalSaida: string = "";
  totalIntras: string = "";
  widget = WdgetCounter3Component;

  async ngOnInit() {

    const snapsHost = await getCountFromServer(collection(getFirestore(), ServiceMovimento.STORAGE_MOVE));
    const quanty = snapsHost.data().count;
    if (quanty >= 1000) {
      this.totalProdutos = (quanty / 1000).toFixed(1) + 'k';
    } else {
      this.totalProdutos = "" + quanty;
    }
    WdgetCounter3Component.qt = quanty;
    WdgetCounter3Component.listMovimento.push(quanty);


    const snapEntrada = await getCountFromServer(collection(getFirestore(), ServiceMovimento.STORAGE_NAME));
    const quantyEntra = snapEntrada.data().count;

    if (quantyEntra >= 1000) {
      this.totalEntradas = (quantyEntra / 1000).toFixed(1) + 'k';
    } else {
      this.totalEntradas = "" + quantyEntra;
    }
    WdgetCounter3Component.entrada = quantyEntra
    WdgetCounter3Component.listMovimento.push(quantyEntra);


    const snapSaidas = await getCountFromServer(collection(getFirestore(), ServiceRequisicao.STORAGE_NAME));
    const quantySaidas = snapSaidas.data().count;

    if (quantySaidas >= 1000) {
      this.totalSaida = (quantySaidas / 1000).toFixed(1) + 'k';
    } else {
      this.totalSaida = "" + quantySaidas;
    }
    WdgetCounter3Component.saida = quantySaidas
    WdgetCounter3Component.listMovimento.push(quantySaidas);


    const snapTrans = await getCountFromServer(collection(getFirestore(), ServiceTransferencia.STORAGE_NAME));
    const quantyTrans = snapTrans.data().count;

    if (quantyTrans >= 1000) {
      this.totalIntras = (quantyTrans / 1000).toFixed(1) + 'k';
    } else {
      this.totalIntras = "" + quantyTrans;
    }
    WdgetCounter3Component.trnasf = quantyTrans
    WdgetCounter3Component.listMovimento.push(quantyTrans);

    const snapDevo = await getCountFromServer(collection(getFirestore(), ServiceDevolucao.STORAGE_NAME));
    const quantyDe = snapDevo.data().count;

    if (quantyDe >= 1000) {
      this.totalIntras = (quantyDe / 1000).toFixed(1) + 'k';
    } else {
      this.totalIntras = "" + quantyDe;
    }
    WdgetCounter3Component.devolu = quantyDe;
    WdgetCounter3Component.listMovimento.push(quantyDe);

    this.initChart()

  }


  initChart() {

    let KTCardsWidget17 = function () {
      // Private methods
      let initChart = function () {

        let el = document.getElementById('kt_card_widget_17_chart123');

        if (!el) {
          return;
        }


        let options = {
          // @ts-ignore
          size: el.getAttribute('data-kt-size') ? parseInt(el.getAttribute('data-kt-size')) : 70,
          // @ts-ignore
          lineWidth: el.getAttribute('data-kt-line') ? parseInt(el.getAttribute('data-kt-line')) : 11,
          // @ts-ignore
          rotate: el.getAttribute('data-kt-rotate') ? parseInt(el.getAttribute('data-kt-rotate')) : 145,
          //percent:  el.getAttribute('data-kt-percent') ,
        }

        let canvas = document.createElement('canvas');
        let span = document.createElement('span');

        // @ts-ignore
        if (typeof (G_vmlCanvasManager) !== 'undefined') {
          // @ts-ignore
          G_vmlCanvasManager.initElement(canvas);
        }

        let ctx = canvas.getContext('2d');
        canvas.width = canvas.height = options.size;

        el.appendChild(span);
        el.appendChild(canvas);

        // @ts-ignore
        ctx.translate(options.size / 2, options.size / 2); // change center
        // @ts-ignore
        ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

        //imd = ctx.getImageData(0, 0, 240, 240);
        let radius = (options.size - options.lineWidth) / 2;

        // @ts-ignore
        let drawCircle = function (color, lineWidth, percent) {
          percent = Math.min(Math.max(0, percent || 1), 1);
          // @ts-ignore
          ctx.beginPath();
          // @ts-ignore
          ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
          // @ts-ignore
          ctx.strokeStyle = color;
          // @ts-ignore
          ctx.lineCap = 'round'; // butt, round or square
          // @ts-ignore
          ctx.lineWidth = lineWidth
          // @ts-ignore
          ctx.stroke();
        };

        // Init
        drawCircle('#E4E6EF', options.lineWidth, WdgetCounter3Component.qt / WdgetCounter3Component.qt);
        // @ts-ignore
        drawCircle('#E4E6EF', options.lineWidth,
          ((WdgetCounter3Component.entrada + (WdgetCounter3Component.trnasf + WdgetCounter3Component.saida + WdgetCounter3Component.devolu)) / WdgetCounter3Component.qt).toFixed(1));
        // @ts-ignore
        drawCircle(KTUtil.getCssVariableValue('--kt-success'), options.lineWidth,
          (
            ((WdgetCounter3Component.trnasf + WdgetCounter3Component.saida + WdgetCounter3Component.devolu)) / WdgetCounter3Component.qt).toFixed(1)
        );


        // @ts-ignore
        drawCircle(KTUtil.getCssVariableValue('--kt-primary'), options.lineWidth,
          ((WdgetCounter3Component.saida + WdgetCounter3Component.devolu) / WdgetCounter3Component.qt).toFixed(1)
        );


        // @ts-ignore
        drawCircle(KTUtil.getCssVariableValue('--kt-danger'), options.lineWidth,
          (WdgetCounter3Component.devolu / WdgetCounter3Component.qt).toFixed(1)
        );

      }

      // Public methods
      return {
        init: function () {
          initChart();
        }
      }
    }();


    //@ts-ignore
    KTCardsWidget17.init();
  }


}
