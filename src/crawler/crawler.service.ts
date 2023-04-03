import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CrawlerService {
  async crawl() {
    try {
      const browser = await puppeteer.launch({
        // headless: false,
        // devtools: true,
      });

      const page = await browser.newPage();

      await page.setCacheEnabled(false);

      await page.goto('https://vieclam24h.vn/', {
        waitUntil: 'networkidle2',
        timeout: 0,
      });

      await page.setViewport({ width: 1080, height: 1024 });

      const searchResultSelector = '.select-search-custom';
      const selectEle = await page.$$(searchResultSelector);
      await selectEle[1].click();
      const aray = await page.$eval('.select-search-custom__select', (e) => {
        const eles = Array.from(
          e.querySelectorAll('li.select-search-custom__row > button'),
        );
        const texts = eles.map((i) => i.innerHTML);
        return texts;
      });

      // await page.click(searchResultSelector);

      // const content = await page.content();

      return {
        code: 200,
        aray,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }

  async crawlAgo() {
    try {
      const browser = await puppeteer.launch({
        // headless: false,
        // devtools: true,
      });

      const page = await browser.newPage();

      await page.setCacheEnabled(false);

      await page.goto('https://www.agoda.com/vi-vn/', {
        waitUntil: 'networkidle2',
        timeout: 0,
      });

      await page.setViewport({ width: 1080, height: 1024 });

      // const searchResultSelector = '.select-search-custom';
      // const selectEle = await page.$$(searchResultSelector);
      // await selectEle[1].click();
      // const aray = await page.$eval('.select-search-custom__select', (e) => {
      //   const eles = Array.from(
      //     e.querySelectorAll('li.select-search-custom__row > button'),
      //   );
      //   const texts = eles.map((i) => i.innerHTML);
      //   return texts;
      // });

      // await page.click(searchResultSelector);

      const content = await page.content();

      return {
        code: 200,
        content,
      };
    } catch (error) {
      return {
        error,
      };
    }
  }
}
