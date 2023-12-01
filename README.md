
# راهنمای استفاده

بعداز [دانلود](https://github.com/mojtabaasadi/evand-ticket-gate/releases/download/untagged-3ef3db6f909a00e5bc64/app-release.apk) و نصب اپ،
 روی دکمه دانلود دیتا بزنید و مسیر فایل json را به مسیر اطلاعات خود تغییر دهید (میتوانید در ادامه نحوه ایجاد فایل json را مشاهده کنید) سپس با اسکن هر بلیط نام و نام خانوادگی شرکت کننده نمایش داده میشود


## روش اول

دستور زیر را در پوشه ای که این رپو را در آن clone کرده‌اید اجرا کنید

‍‍‍``` node createJson.js {xlxs file path (downloaded from evand)}```

سپس فایل خروجی (out.json) را در جایی به مانند https://jsonbin.io  میزبانی کنید و مسیر را در اپ ارائه دهید