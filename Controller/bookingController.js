const Booking = require('./../Models/bookingModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

// جلب كل الحجوزات
exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();
  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: bookings
  });
});

// جلب حجز واحد
exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: booking
  });
});

// إضافة حجز
exports.addBooking = catchAsync(async (req, res, next) => {
  const newBooking = await Booking.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newBooking
  });
});

// تحديث حجز
exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: booking
  });
});

// حذف حجز
exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// جلب الحجوزات المعلقة بدون سائق
exports.getPendingBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ status: 'pending', driver: null });
  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: bookings
  });
});

// قبول الحجز من السائق
exports.acceptBooking = catchAsync(async (req, res, next) => {
  const bookingId = req.params.id;
  const driverId = req.user.id;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return next(new AppError('No booking found with that ID', 404));
  }

  if (booking.status !== 'pending' || booking.driver) {
    return next(new AppError('This booking is already accepted', 400));
  }

  booking.driver = driverId;
  booking.status = 'accepted';
  await booking.save();

  res.status(200).json({
    status: 'success',
    message: 'تم قبول الحجز',
    data: booking
  });
});

// جلب الحجوزات الخاصة بالسائق الحالي
exports.getDriverBookings = catchAsync(async (req, res, next) => {
  const driverId = req.user.id;
  const bookings = await Booking.find({ driver: driverId });

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: bookings
  });
});
