---
title: 'Six titles, one company: what I learned moving through PS roles'
date: '2026-08-28'
description: 'Senior developer, DevOps engineer, cloud architect, head of technology, practice leader, principal consultant. Seven years at the same consultancy, and what each role broke that I thought I already knew.'
tags: ['career', 'consulting', 'aws', 'leadership']
published: true
---

Six titles since 2019, all at the same company. Senior developer, DevOps engineer, cloud architect, head of technology, modernisation practice leader, and now modernisation principal consultant.

People ask what the jumps felt like and I usually say something boring about scope. What actually happened is that each role broke something I was sure about, and I'd like to write those down before I forget which lesson came from where.

Fair warning: most of this only applies to consulting.

## Senior developer

The thing that took me years to actually feel, rather than just know: you don't live with what you build. Someone else does, six months later, on a Monday, without you in the room.

I spent a lot of that period writing code I was proud of for an audience I'd never meet. The abstraction that made me happy on Thursday afternoon is the abstraction their two-person platform team hits at 11pm during an incident.

So the question I now ask in week one is the one I used to ask in the last week. Who maintains this after we go? If the honest answer is "two people who've never written Terraform", then my clever module isn't clever. It's a bill somebody pays later.

## DevOps engineer

First role where my mistakes were loud.

A broken feature is annoying. A broken pipeline stops eight people from working, and it tends to pick 4pm on a Friday to do it. That does change how you design things. You start with the failure case because you're the one holding the pager.

What surprised me was how little of the hard part was technical. Getting a four-environment landing zone to deploy cleanly is a solved problem, mostly. Getting three teams to agree on who approves production, what rollback actually means when the database migration already ran, and whether drift gets fixed or just reported into a channel nobody reads, that's where the weeks went.

And the one I still wince about. For a stretch there, our deploy only really worked when I ran it. Nobody planned that. It accumulated, one undocumented step at a time, until I was the automation. Took months to unpick and it was entirely self-inflicted.

## Cloud architect

I produced some genuinely beautiful diagrams in my first months here. Nobody used them.

What I'd missed is that a design ignoring the customer's org chart gets quietly re-implemented by their team about a quarter after we leave, usually worse. Their existing tooling, their appetite for on-call, whether they have anyone who can read a state file. All of that is input, not context.

The habit that survived from that period is writing down the options I rejected and why. Not the chosen design, the discards. Six months later, when someone asks why we didn't just use X, the answer lives somewhere other than my memory. Customers got more value out of those notes than out of the architecture pack they actually paid for.

## Head of technology

Hardest transition, for a reason I didn't see coming: I stopped being measured on anything I made.

I handled it badly at first. Stayed involved in delivery detail nobody needed me in, told myself it was mentoring. The engineers had it covered. Meanwhile the actual job, which was making the practice better at something rather than making one project better, sat there.

I also learned you can't mandate consistency. I wrote guidelines. People ignored them, politely, in the way consultants ignore things while nodding. What worked was making the paved road cheaper than the alternative: modules that saved a week, pipeline templates with the boring parts already solved, examples that were current rather than aspirational. Once the standard is the lazy option, adoption stops being a conversation you have to keep having.

The part I was least prepared for is that a consultancy has economics attached to it. Utilisation is real. Bench is real. There's a genuine tension between "this engineer would learn a lot on that engagement" and "this engagement needs someone who already knows it", and I don't think there's a clean answer. Pretending the tension isn't there doesn't make you principled, it just moves the decision to someone else.

## Practice leader, then principal consultant

The thing I resisted longest was that selling the work is part of the work.

I used to treat presales as a formality before the real job started. It isn't. Bad scope is technical debt with a signature on it, and no amount of good delivery digs you out. That awkward half hour where you ask who actually owns the database, or whether the legacy system is genuinely being decommissioned or just "planned for decommission", shapes the outcome more than anything you decide in month two.

The other thing took about ten years to see clearly. A lot of what we get paid for isn't technical. Someone inside the organisation usually already knows what needs to happen. They've said it three times and been ignored, or they can't say it without it being political. We arrive, do the analysis properly, arrive at the same conclusion, and attach an invoice to it. That gives them cover.

I found that a bit cynical when I first noticed it. I don't anymore. It's just how organisations work, and being useful in that way is a real skill. You just have to notice it's happening, or you'll spend three months solving the technical problem that was never the blocker.

## The compressed version

If you're earlier in this: the thing that gets you promoted is usually the thing you then have to stop doing. Being the person who fixes it himself is why you get made a lead, and continuing to be that person is why you're a bad one. That one cost me about a year.

Moving back toward hands-on work isn't a demotion either. I've gone deep and broad more than once, and the deep stretches are what keep the broad ones honest. An architect who hasn't touched a build in two years starts saying things that aren't true.

The rest I'm still working out, which is more or less why I write these down.
