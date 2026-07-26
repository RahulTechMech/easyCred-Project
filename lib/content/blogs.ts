export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "personal-loan-guide-for-first-time-borrowers",
    title: "Personal Loan Guide for First-Time Borrowers",
    excerpt: "Everything you need to know before taking out your first personal loan — from eligibility to repayment.",
    category: "Personal Loan Guide",
    readTime: "6 min read",
    date: "2026-06-02",
    content: [
      "Taking out a personal loan for the first time can feel overwhelming, but breaking it down into a few key questions makes the process far more manageable.",
      "Start by understanding how much you actually need. It's tempting to borrow a round number, but calculating your exact requirement — including a small buffer for unexpected costs — helps avoid paying interest on money you don't use.",
      "Next, look at your monthly budget honestly. Lenders typically want your total EMIs (existing plus new) to stay under 40-50% of your monthly income. Our Eligibility Calculator gives you a quick, indicative sense of where you stand before you formally apply.",
      "Finally, compare more than just the headline interest rate. Processing fees, prepayment charges, and the loan tenure all affect the total cost of borrowing. A slightly higher rate with no prepayment penalty might work out cheaper than a lower rate with a long lock-in.",
    ],
  },
  {
    slug: "understanding-your-emi-a-practical-guide",
    title: "Understanding Your EMI: A Practical Guide",
    excerpt: "How EMIs are actually calculated, and what levers you can pull to change your monthly payment.",
    category: "EMI Guide",
    readTime: "5 min read",
    date: "2026-05-18",
    content: [
      "Your EMI (Equated Monthly Installment) is made up of two parts: principal and interest. In the early months of a loan, a larger share of your EMI goes toward interest; over time, that shifts toward principal.",
      "Three variables determine your EMI: the loan amount, the interest rate, and the tenure. Increasing the tenure lowers your monthly EMI but increases the total interest you pay over the life of the loan — there's always a trade-off.",
      "Our EMI Calculator lets you adjust all three variables and see the amortization schedule update instantly, so you can find the combination that fits your monthly budget without overpaying in total interest.",
    ],
  },
  {
    slug: "5-tips-to-improve-your-loan-approval-chances",
    title: "5 Tips to Improve Your Loan Approval Chances",
    excerpt: "Practical, actionable steps to strengthen your profile before you apply for a personal loan.",
    category: "Loan Approval Tips",
    readTime: "4 min read",
    date: "2026-05-05",
    content: [
      "1. Keep your existing EMIs current. Lenders look closely at your repayment history — even one missed payment on an existing loan or credit card can affect a new application.",
      "2. Reduce your debt-to-income ratio before applying. Paying down a credit card balance or closing a small loan can meaningfully improve how lenders view your application.",
      "3. Apply for an amount you can comfortably support. Requesting less than the maximum you're eligible for often results in faster, smoother approval.",
      "4. Keep your documentation complete and consistent. Mismatched addresses or outdated employment details are common causes of delay.",
      "5. Avoid applying to many lenders simultaneously in a short window, as multiple hard inquiries in quick succession can be viewed unfavorably.",
    ],
  },
  {
    slug: "building-a-simple-monthly-budget-that-actually-works",
    title: "Building a Simple Monthly Budget That Actually Works",
    excerpt: "A no-frills approach to budgeting that makes room for EMIs without derailing your other goals.",
    category: "Financial Planning",
    readTime: "5 min read",
    date: "2026-04-22",
    content: [
      "Most budgeting advice fails because it's too rigid. A simpler approach: split your income into three buckets — essentials, obligations (including EMIs), and everything else.",
      "Essentials cover rent, groceries, and utilities. Obligations cover existing EMIs, insurance premiums, and any new loan payment you're planning to take on. Everything else is discretionary spending and savings.",
      "Before taking a new loan, run the numbers on paper first: what does your 'obligations' bucket look like with the new EMI added? If it comfortably fits without squeezing essentials, you're in a reasonable position to proceed.",
    ],
  },
  {
    slug: "how-to-read-and-improve-your-credit-profile",
    title: "How to Read and Improve Your Credit Profile",
    excerpt: "A plain-language walkthrough of what goes into your credit profile and how to strengthen it over time.",
    category: "Credit Improvement",
    readTime: "6 min read",
    date: "2026-04-10",
    content: [
      "Your credit profile is built from a few core factors: repayment history, credit utilization (how much of your available credit you're using), length of credit history, and the mix of credit types you hold.",
      "Repayment history typically carries the most weight — consistently paying on time, even small amounts, matters more than occasional large payments.",
      "Credit utilization is worth watching closely: keeping your credit card balances well below your limit, even if you pay in full each month, tends to help.",
      "If you don't have an official bureau report handy, our Loan Readiness Score offers a rough, self-reported estimate of where you stand — useful for a general sense, though it's not a substitute for checking your actual bureau report periodically.",
    ],
  },
  {
    slug: "personal-loan-vs-credit-card-which-makes-sense",
    title: "Personal Loan vs. Credit Card: Which Makes Sense?",
    excerpt: "A side-by-side look at when a personal loan is the better tool compared to credit card debt.",
    category: "Personal Loan Guide",
    readTime: "4 min read",
    date: "2026-03-28",
    content: [
      "Credit cards are well suited to short-term, revolving expenses you can pay off within a billing cycle or two. Personal loans are generally better for larger, one-time expenses with a clear repayment timeline.",
      "Interest rates on unpaid credit card balances are typically much higher than personal loan rates, so carrying a large balance on a card for many months usually costs more than consolidating it into a personal loan with a fixed EMI.",
      "If you're already carrying credit card debt across multiple cards, a debt consolidation personal loan can simplify your repayments into a single monthly EMI — often at a lower blended interest rate.",
    ],
  },
];
