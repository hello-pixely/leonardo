/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import contrastColors from '@adobe/leonardo-contrast-colors';
import './demo.css';

function createColors() {
  var br = document.getElementById('sliderBrightness');
  var con = document.getElementById('sliderContrast');
  var mode = document.getElementById('darkMode');
  br.min= "-15";
  br.max= "0";

  var brVal = br.value * -1; // convert br.value to positive number to use as index
  var conVal = con.value;

  // TEST -> Define colors as configs and scales.
  var baseRatios = [-1.1,1,1.25,1.94,3,3.99,5.22,6.96,9.30,12.45,15];
  var uiRatios = [1.3,3.5,5];

  var grayScale = contrastColors.createScale({
    swatches: 100,
    colorKeys: ['#000036', '#f9ffff'],
    colorspace: 'LAB'
  });
  var blueScale = contrastColors.createScale({
    colorKeys: ['#0272d4','#b2f0ff','#55cfff','#0037d7'],
    colorspace: "CAM02"
  });

  var redScale = contrastColors.createScale({
    colorKeys: ["#ea2825","#ffc1ad","#fd937e"],
    colorspace: "LAB"
  });

  var base = grayScale.colors[4];
  br.min= "-15";
  br.max= "0";

  if(mode.checked == true) {
    brVal = 84 + brVal;

    var base = grayScale.colors[brVal];
  } else {

    var base = grayScale.colors[brVal];
  }

  baseRatios = baseRatios.map(function(d) {
    var newVal = ((d-1) * conVal) + 1;
    return newVal;
  });
  uiRatios = uiRatios.map(function(d) {
    var newVal = ((d-1) * conVal) + 1;
    return newVal;
  });

  // adaptColor();
  let grayArray = contrastColors.generateContrastColors({colorKeys: grayScale.colorKeys, colorspace: grayScale.colorspace, base: base, ratios: baseRatios});
  let redArray = contrastColors.generateContrastColors({colorKeys: redScale.colorKeys, colorspace: redScale.colorspace, base: base, ratios: uiRatios});
  let blueArray = contrastColors.generateContrastColors({colorKeys: blueScale.colorKeys, colorspace: blueScale.colorspace, base: base, ratios: uiRatios});

  document.documentElement.style
    .setProperty('--gray50', grayArray[0]);
  document.documentElement.style
    .setProperty('--gray100', grayArray[1]);
  document.documentElement.style
    .setProperty('--gray200', grayArray[2]);
  document.documentElement.style
    .setProperty('--gray300', grayArray[3]);
  document.documentElement.style
    .setProperty('--gray400', grayArray[4]);
  document.documentElement.style
    .setProperty('--gray500', grayArray[5]);
  document.documentElement.style
    .setProperty('--gray600', grayArray[6]);
  document.documentElement.style
    .setProperty('--gray700', grayArray[7]);
  document.documentElement.style
    .setProperty('--gray800', grayArray[8]);
  document.documentElement.style
    .setProperty('--gray900', grayArray[9]);
  document.documentElement.style
    .setProperty('--gray1000', grayArray[10]);
  document.documentElement.style
    .setProperty('--gray1100', grayArray[11]);
  // Blues
  document.documentElement.style
    .setProperty('--blue100', blueArray[0]);
  document.documentElement.style
    .setProperty('--blue200', blueArray[1]);
  document.documentElement.style
    .setProperty('--blue300', blueArray[2]);
}

createColors();

window.createColors = createColors;

