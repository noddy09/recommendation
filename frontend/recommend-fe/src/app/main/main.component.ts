import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { HttpService } from '../shared/http.service';

declare let $: any;
declare let d3: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  bands: any;
  items: any;
  allBands: any;
  allItems: any;
  selectedBand: any;
  svg: any;

  constructor(httpService: HttpService) {
    this.allBands = []
    this.allItems = []
    this.bands = []
    this.items = []
    this.selectedBand = false;

    httpService.get("http://localhost:8000/rest/v1/band/").subscribe(data => {
      this.bands = data
      this.ngAfterViewInit()
    })
    httpService.get("http://localhost:8000/rest/v1/item/").subscribe(data => {
      this.items = data
      this.ngAfterViewInit()
    })
  }

  ngOnInit(): void {
  }

  p_band_slide(event: any, ui: any) {
    var piTop = $("[id^=p_band]").first().position().top - $("#p_i").position().top
    var startY = $("#" + event.target.id.toString()).offset().top - $("#p_i").position().top - piTop + 15
    var $scope = this
    var selected_value = ui.value
    var selected_items = $("#" + event.target.id.toString() + "_items").val()
    var band_id = event.target.id.toString().slice(6)
    $scope.selectedBand = this.bands.find((ele: any) => ele.id == band_id)
    var slide_items = $scope.selectedBand.items
    var x = $("#p_i").width()
    var html = '<svg width=' + x + ' height=' + $("#p_i").height() + '>'
    slide_items.forEach((element: any) => {
      $("#p_item" + element.toString()).slider('value', selected_value)
      var y = $("#p_item" + element.toString()).position().top - $("#p_i").position().top - piTop + 15
      var cords = (x - 20).toString() + "," + y.toString() + " " + x.toString() + "," + y.toString()
      html = html + '<polyline fill="none" points="0,' + startY.toString() + ' ' + cords + '" stroke="green"/>'
    });
    html = html + "<svg>"
    $("#p_i").html(html)
    $("#i_r").html("")
    $("#r_band" + $scope.selectedBand.id.toString()).slider('value', selected_value)
  }

  item_slide(event: any, ui: any) {
    // 1st svg
    var piTop = $("[id^=p_band]").first().position().top - $("#p_i").position().top
    var startY = $("#" + event.target.id.toString()).offset().top - $("#p_i").position().top - piTop + 15
    var $scope = this
    var selected_value = ui.value
    var selected_items = $("#" + event.target.id.toString() + "_bands").val()
    var band_id = event.target.id.toString().slice(6)
    var selectedItem = this.items.find((ele: any) => ele.id == band_id)
    var slide_bands = selectedItem.bands
    var x = $("#p_i").width()
    var html = '<svg width=' + x + ' height=' + $("#p_i").height() + '>'
    slide_bands.forEach((element: any) => {
      $("#p_band" + element.toString()).slider('value', selected_value)
      var y = $("#p_band" + element.toString()).position().top - $("#p_i").position().top - piTop + 15
      var cords = "20," + y.toString() + " 0," + y.toString()
      html = html + '<polyline fill="none" points="' + x.toString() + ',' + startY.toString() + ' ' + cords + '" stroke="green"/>'
    });
    html = html + "<svg>"
    $("#p_i").html(html)
    $("#p_band" + selectedItem.id.toString()).slider('value', selected_value)

    // 2nd svg
    x = $("#i_r").width()
    html = '<svg width=' + x + ' height=' + $("#i_r").height() + '>'
    slide_bands.forEach((element: any) => {
      $("#r_band" + element.toString()).slider('value', selected_value)
      var y = $("#r_band" + element.toString()).position().top - $("#i_r").position().top - piTop + 15
      var cords = (x - 20).toString() + "," + y.toString() + " " + x.toString() + "," + y.toString()
      html = html + '<polyline fill="none" points="0,' + startY.toString() + ' ' + cords + '" stroke="green"/>'
    });
    html = html + "<svg>"
    $("#i_r").html(html)
    $("#r_band" + selectedItem.id.toString()).slider('value', selected_value)

  }

  ngAfterViewInit() {
    var $scope = this
    // prefferred bands slider
    $(document).ready(function () {
      $("[id^=p_band]").not("input").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 50,
        min: 10,
        slide: function (event: any, ui: any) {
          $scope.p_band_slide(event, ui)
        }
      })
      document.querySelectorAll('.ui-slider-handle').forEach(function (a) {
        a.remove()
      })
      document.styleSheets[6].insertRule(".ui-widget-header { background-image:none !important;background-color:#fc3200 !important;opacity: 0.2 !important;}");

      //items slider
      $("[id^=p_item]").not("input").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 50,
        min: 10,
        slide: function (event: any, ui: any) {
          $scope.item_slide(event, ui)
        }
      })
      document.querySelectorAll('.ui-slider-handle').forEach(function (a) {
        a.remove()
      })
      document.styleSheets[6].insertRule(".ui-widget-header { background-image:none !important;background-color:#fc3200 !important;opacity: 0.2 !important;}");

      // recommended band slider
      $("[id^=r_band]").not("input").slider({
        orientation: "horizontal",
        range: "min",
        max: 100,
        value: 50,
        min: 10,
        slide: function (event: any, ui: any) {
          var selected_value = ui.value
          var selected_items = $("#" + event.target.id.toString() + "_items").val()
        }
      })
      document.querySelectorAll('.ui-slider-handle').forEach(function (a) {
        a.remove()
      })
      document.styleSheets[6].insertRule(".ui-widget-header { background-image:none !important;background-color:#fc3200 !important;opacity: 0.2 !important;}");

      // 1st svg area
      var firstEle = $("[id^=p_band]").first()
      var piTop = firstEle.position().top - $("#p_i").position().top
      var piLeft = firstEle.position().left + firstEle.width() + 5
      $("#p_i").css({
        marginTop: piTop.toString() + "px",
        marginLeft: piLeft.toString() + "px"
      })
        .height($("[id^=p_item]").not("input").last().offset().top - $("[id^=p_item]").first().offset().top)
        .width($("[id^=p_item]").first().offset().left - piLeft)

      // 2nd svg area
      var firstEle = $("[id^=p_item]").first()
      var piTop = firstEle.position().top - $("#i_r").position().top
      var piLeft = firstEle.position().left + firstEle.width() + 5
      $("#i_r").css({
        marginTop: piTop.toString() + "px",
        marginLeft: piLeft.toString() + "px"
      })
        .height($("[id^=p_item]").not("input").last().offset().top - $("[id^=r_band]").first().offset().top)
        .width($("[id^=r_band]").first().offset().left - piLeft)
    });
  }
}
