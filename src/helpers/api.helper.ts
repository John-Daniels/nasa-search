export const catchAsync = async (callback, onError) => {
  try {
    await callback();
  } catch (e) {
    onError(e);
  }
};
