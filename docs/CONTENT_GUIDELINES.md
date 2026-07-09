# The Bible Bite Content Guidelines

This is the source of truth for creating and reviewing Bible Bite content.

## Product Flow

Curiosity → Think → Reveal → Understand → Remember → Apply → Pray → Read

The Bible Bite is not primarily a Bible trivia site. A factual question is welcome when the fact leads to interesting biblical truth, context, connection, or deeper understanding.

A strong question should often create one of these reactions:

- `Wait... I never thought about that.`
- `I know this story, but I don't actually know why.`
- `I think I know this.`
- `I've wondered about that too.`

## Question Rules

- There must be one best answer.
- All four choices should feel realistic enough to require thought.
- Plausible distractors are better than joke or absurd distractors, unless the tone intentionally calls for one.
- Do not make the correct answer obvious through wording length, tone, specificity, or repeated phrasing.
- The explanation must genuinely support why the best answer is best.
- Interpretive language must match `answerBasis`.
- Correct-answer positions should be intentionally balanced across a batch.
- Avoid accidental patterns such as most correct answers being B.

## Question Types

- `look-closer`: An interesting question raised directly by details in the biblical text.
- `context`: Historical, literary, cultural, sequence, or surrounding-passage context meaningfully changes understanding.
- `big-meaning`: A familiar statement, verse, image, or biblical moment needs to be unpacked beyond the surface.
- `hard-question`: A sincere difficult Bible or faith question that deserves a careful answer.

## Answer Basis

- `explicit-text`: The answer is directly stated or unambiguously established in Scripture.
- `strong-contextual-inference`: The answer is strongly supported by the passage and biblical context, but the exact conclusion is an interpretation or inference rather than an explicit statement.
- `debated`: Faithful Christian interpreters or major Christian traditions meaningfully disagree about the answer.

For `explicit-text`, direct language is appropriate when Scripture clearly establishes the answer.

For `strong-contextual-inference`, use honest wording where needed, such as:

- `The passage suggests...`
- `The context points to...`
- `A strong way to understand this is...`
- `This appears to...`

Do not write an inference as though Scripture explicitly states an unstated motive, reason, or internal thought.

For `debated`, acknowledge meaningful disagreement. Do not quietly present one denomination or theological tradition's interpretation as settled biblical fact. Explain major faithful views fairly enough for the Bite's scope. The Bite may still identify an editorial conclusion when appropriate, but it must distinguish interpretation from explicit biblical wording.

## Quiz Feedback And Explanation

- The quiz UI handles correctness.
- Answer choices identify the correct answer after submission.
- Compact result feedback may confirm whether the reader was correct.
- Explanations teach the biblical reasoning and meaning.
- Explanations should not repeat the selected answer.
- Explanations should not repeat the correct option as an answer key.
- Avoid phrases such as `the best answer is A` or `the correct answer is D` in Explanation copy.
- Remove answer-choice letters from explanatory teaching unless a rare editorial reason genuinely requires them.
- The Explanation should read naturally even when separated from the quiz controls.

## Length Targets

These are editorial targets, not automated validation limits.

- Curiosity hook: approximately 8 to 20 words.
- Question: usually approximately 10 to 30 words.
- Explanation: typically 175 to 300 words, and may extend to approximately 400 words when genuinely necessary.
- Big Truth: 1 to 2 sentences, usually under approximately 35 words.
- Take the Bite: one practical action or reflection, usually under approximately 50 words.
- Prayer: typically 60 to 120 words.
- Go Deeper: one primary passage and one short reading prompt.

## Topic And Tag Rules

Use the canonical primary topic taxonomy for broad discovery:

- Faith & God
- Jesus & the Gospel
- People & Stories
- Bible & History
- Prayer & Worship
- Wisdom & Life
- Hard Questions
- Weird & Wonderful

Use tags for specific details such as Bible books, people, themes, places, and concepts. Bible books are tags or future book-browsing data, not primary topics.

## Publication Status And Public Availability

`published` is a content workflow status. It means a Bite has been approved for publishing, not that it is automatically visible on public site surfaces.

A Bite is publicly available only when:

- `status` is `published`
- its Bite date has arrived according to the configured publication timezone

Future-dated published Bites are scheduled content. They must stay hidden from public discovery surfaces, direct Bite routes, today's Bite selection, topic counts, and static route generation until their publication date arrives.

Do not add a separate `scheduled` status or publication field unless the content model is intentionally redesigned later. The current model uses workflow `status` plus Bite `date`.

## Style

- Conversational.
- Warm.
- Clear.
- Not academic unless necessary.
- Not preachy.
- Not shaming.
- Not repetitive.
- Avoid em dashes in original site copy unless absolutely necessary.

Prefer:

- periods
- commas
- colons
- semicolons
- parentheses
- sentence breaks

Do not alter exact Scripture quotations solely to conform to the em dash preference.

## Emoji Use

Emojis are seasoning, not the voice.

- Do not use emojis in quiz questions.
- Do not use emojis in answer choices.
- Emojis may appear sparingly in original explanatory copy when they support a natural conversational beat.
- Usually use no more than one emoji in an explanation.
- One or two may be acceptable only when genuinely appropriate.
- Emojis are optional.
- Do not force an emoji into every Bite.
- Avoid repetitive AI-style emoji patterns.

## Review Checklist

### Question

- Is the question genuinely interesting?
- Does it fit a defined `questionType`?
- Is there one defensible best answer?
- Are all four options plausible enough to require thought?
- Does the question accidentally reveal the answer?
- Is the correct answer position balanced with the surrounding batch?

### Biblical Support

- Is the Scripture reference accurate?
- Does the Scripture quotation match the configured translation/source?
- Is `answerBasis` assigned honestly?
- Does the explanation distinguish explicit text from inference?
- If debated, are meaningful Christian views acknowledged fairly?
- Are claims grounded in the passage or appropriate biblical context?

### Discovery

- Is the primary topic the best broad discovery category?
- Are specific Bible books, people, themes, and concepts represented with useful tags?
- Does `curiosityHook` create interest without revealing the answer?

### Experience

- Does the explanation create a meaningful learning moment?
- Is Big Truth memorable?
- Is Take the Bite small and practical?
- Does the prayer directly respond to the Bite?
- Does Go Deeper link to a relevant primary passage?

### Style

- Is it conversational, warm, and clear?
- Is it free of unnecessary academic tone?
- Is it free of preachy or shaming language?
- Is it free of repetition?
- Is it free of unnecessary em dashes?
