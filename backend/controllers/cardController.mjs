import Card from "../models/card.mjs";

export default class CardController {
  static async createCard(req, res) {
    try {
      const { title, content } = req.body;
      const card = new Card({
        title,
        content,
        createdBy: req.user.id,
      });
      await card.save();
      res.status(201).json(card);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getAllCards(req, res) {
    try {
      const cards = await Card.find().populate("createdBy", "name");
      res.json(cards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCard(req, res) {
    try {
      const { id } = req.params;
      await Card.findByIdAndDelete(id);
      res.json({ msg: "Card deleted" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}