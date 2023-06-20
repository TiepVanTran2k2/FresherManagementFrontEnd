export class FeedbackQuestionType {
  static MultipleChoices = 1;
  static SingleChoice = 2;
  static RatingScale = 3;
  static OpenEnded = 4;

  static All = [
    {
      name: "Multiple Choices",
      value: this.MultipleChoices,
    },
    {
      name: "Single Choice",
      value: this.SingleChoice,
    },
    {
      name: "Rating Scale",
      value: this.RatingScale,
    },
    {
      name: "Open-Ended",
      value: this.OpenEnded,
    },
  ];

  static getFeedbackQuestionType = (type) => {
    const questionTypeMap = {
      1: "Multiple Choices",
      2: "Single Choice",
      3: "Rating Scale",
      4: "Open-Ended",
    };

    return questionTypeMap[type];
  };
}
