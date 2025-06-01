---
title: About
---

## My Blog

**ယခု Blog Single Page Application (SPA) အား Web Api များအကြောင်း [Deepseek Ai][deepseek] ထံ မေးမြန်းသည်မှတဆင့်သိရှိရသည်များနှင့်ဖန်တီးခဲ့ခြင်းဖြစ်ပါသည်။ ယခု `readme.md` တွင်ရေးသားထားခြင်းအများစုမှာလည်း [Deepseek Ai][deepseek] မှ ဖြေကြားချက်များ အများစုဖြစ်ပါသည်။**

### About

Hash-based Routing ကိုအသုံးပြု၍ Single HTML file တစ်ခုတည်းဖြင့် blog post ကဲ့သို့ dynamic content များကို ဖော်ပြခြင်းဖြစ်ပါသည်။

#### အခြေခံအလုပ်လုပ်ပုံ

1. အသုံးပြုသူမှ link နှိပ်ပြီး ပြောင်းခြင်း သို့မဟုတ် Browser မှ URL Change သည့်အခါ နမူနာအနေနှင့် ယခု အတိုင်း ဖြစ်မည်
   https://example.com#page1,https://example.com#about, request path အနေနှင့် `#page1` `#about` ဖြစ်မည်။

2. JavaScript က URL ကိုဖတ်ပြီး အလိုက်သင့် data ကိုလက်ခံပြီး page content ကို dynamically update လုပ်သည်။

#### Hash URL နမူနာ

```js
// Hash URL (#post-123) ကိုအသုံးပြုခြင်း
window.addEventListener("hashchange", loadContent);

async function loadContent() {
  const postId = window.location.hash.substring(1); // #post-123 → "post-123"
  if (postId) {
    const post = await fetchPosts(postId.replace("post-", ""));
    renderPost(post);
  }
}
```

#### အားသာချက်များ

1. Backend မလိုအပ် - Static hosting (GitHub Pages, Netlify, Vercel) တွင်ပင် အလုပ်လုပ်နိုင်

2. Single HTML file တစ်ခုတည်းဖြင့် အလွယ်တကူ deploy လုပ်နိုင်

3. Client-side rendering ဖြစ်သောကြောင့် အမြန်နှုန်းမြင့်

#### အားနည်းချက်များ

1. Hash-based routing သည် SEO အတွက် အကောင်းဆုံး ရွေးချယ်မှု မဟုတ်နိုင်။

2. Initial load တွင် API response ကိုစောင့်ရန် Loading indicator ထားသင့်

3. Browser JavaScript disable လုပ်ထားပါက အလုပ်မလုပ်

<!-- Definitions -->

[deepseek]: https://www.deepseek.com/
