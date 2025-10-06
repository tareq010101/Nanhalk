const Driver = require('./../Models/driverModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// جلب كل السائقين
exports.getAllDrivers = catchAsync(async (req, res, next) => {
  const drivers = await Driver.find();
  res.status(200).json({
    status: 'success',
    results: drivers.length,
    data: { drivers }
  });
});

// جلب سائق واحد
exports.getDriver = catchAsync(async (req, res, next) => {
  const driver = await Driver.findById(req.params.id);
  if (!driver) {
    return next(new AppError('No driver found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { driver }
  });
});

// إنشاء سائق
exports.createDriver = catchAsync(async (req, res, next) => {
  const newDriver = await Driver.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { driver: newDriver }
  });
});

// تحديث سائق
exports.updateDriver = catchAsync(async (req, res, next) => {
  const driver = await Driver.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!driver) {
    return next(new AppError('No driver found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { driver }
  });
});

// حذف سائق
exports.deleteDriver = catchAsync(async (req, res, next) => {
  const driver = await Driver.findByIdAndDelete(req.params.id);
  if (!driver) {
    return next(new AppError('No driver found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
