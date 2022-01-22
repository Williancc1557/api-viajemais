import chrome from "selenium-webdriver/chrome";
import chromedriver from "chromedriver";
import { Builder, By, Key, Capabilities } from "selenium-webdriver";
import type { ISeleniumProvider } from "../ISeleniumProvider";
import type { Tickets } from "../../entities/Tickets";

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());
const chromeOptions = new chrome.Options();
chromeOptions.excludeSwitches("enable-logging");
export class SeleniumProvider implements ISeleniumProvider {
    public constructor(
        private readonly url: string = "https://viajemais.voeazul.com.br/Availability.aspx"
    ) { }

    public async find(dataForSearch: Tickets): Promise<string> {
        const driver = new Builder().setChromeOptions(chromeOptions).withCapabilities(Capabilities.chrome()).build();
        driver.manage().window().maximize();

        await driver.get(this.url);


        await driver.findElement(By.id("btnSearchPurchase")).click();

        const openSearchSleep = 1000;
        await driver.sleep(openSearchSleep);

        await driver.findElement(By.id("field-1-origin1")).sendKeys(dataForSearch.origin, Key.RETURN);

        await driver.findElement(By.name("departure1")).sendKeys(dataForSearch.exitDate, Key.RETURN);

        await driver.findElement(By.name("destination1")).sendKeys(dataForSearch.destiny, Key.RETURN);

        await driver.findElement(By.name("arrival")).sendKeys(dataForSearch.returnDate, Key.RETURN);

        const oneAdult = 1;
        const nullKid = 0;
        const nullBaby = 0;
        if (dataForSearch.adult != oneAdult || dataForSearch.kid != nullKid || dataForSearch.baby != nullBaby) {
            if (dataForSearch.adult > oneAdult) {
                for (let i = 1; i < dataForSearch.adult; i++) {
                    await driver.findElement(By.id("incrementAdults")).click();
                }
            }
            for (let i = 0; i < dataForSearch.kid; i++) {
                await driver.findElement(By.css("[data-tag-name='incrementar-crianca']")).click();
            }
            for (let i = 0; i < dataForSearch.baby; i++) {
                await driver.findElement(By.css("[data-tag-name='incrementar-bebe']")).click();
            }
        }

        const msSleepForSendSearch = 2000;
        await driver.sleep(msSleepForSendSearch);

        await driver.findElement(By.css("[data-tag-name='buscar-passagens']")).click();

        const msSleepForGetHtmlPage = 4000;
        await driver.sleep(msSleepForGetHtmlPage);

        const data = await driver.getPageSource();
        return data;


    }
}

