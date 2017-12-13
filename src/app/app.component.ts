import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    // translate.addLangs(["en-US", "tr"]);
    translate.setDefaultLang(navigator.language);
    console.log(navigator.language);
  }

  switchLanguage(language: string) {

    var userlang = navigator.language;
    if (userlang == null || userlang == '') {
      this.translate.setDefaultLang('tr');
    }
    else {
      this.translate.use(userlang);
    }
    this.translate.use(userlang.match(/tr|en-US/) ? userlang : 'tr');

    console.log(userlang);

    this.translate.use(language);
  }
  title = 'app';
}
