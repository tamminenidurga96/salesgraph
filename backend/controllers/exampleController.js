const Example = require('../models/exampleModel');

// Controller to get bar chart data
exports.getBarChartData = async (req, res) => {
  const { month } = req.query;
  try {
    const data = await Example.aggregate([
      { $match: { month } },
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to get statistics
exports.getStatistics = async (req, res) => {
  const { month } = req.query;
  try {
    const totalSale = await Example.aggregate([
      { $match: { month, sold: true } },
      { $group: { _id: null, totalSale: { $sum: '$price' } } }
    ]);

    const totalSoldItems = await Example.countDocuments({ month, sold: true });
    const totalNotSoldItems = await Example.countDocuments({ month, sold: false });

    res.status(200).json({
      totalSale: totalSale[0]?.totalSale || 0,
      totalSoldItems,
      totalNotSoldItems
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to get transactions
exports.getTransactions = async (req, res) => {
  const { search, month, page = 1 } = req.query;
  const limit = 10;
  const skip = (page - 1) * limit;

  try {
    const transactions = await Example.find({
      month,
      title: { $regex: search, $options: 'i' }
    }).skip(skip).limit(limit);

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
