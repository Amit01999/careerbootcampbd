import BankRecruitment from '../models/BankRecruitment.js';
import { deleteImageByPublicId } from './cloudinaryService.js';

export const listPublic = async ({ page = 1, limit = 50 }) => {
  const safePage = Math.max(parseInt(page, 10) || 1, 1);
  const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 200);
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    BankRecruitment.find({ isActive: true })
      .select('bankLogoUrl bankName positionTitle createdAt')
      .sort('-createdAt')
      .skip(skip)
      .limit(safeLimit)
      .lean(),
    BankRecruitment.countDocuments({ isActive: true }),
  ]);

  return {
    items,
    pagination: { page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) },
  };
};

export const getPublicById = async (id) => {
  return BankRecruitment.findOne({ _id: id, isActive: true }).lean();
};

export const adminListAll = async ({ page = 1, limit = 50 }) => {
  const safePage = Math.max(parseInt(page, 10) || 1, 1);
  const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 200);
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    BankRecruitment.find()
      .select('bankLogoUrl bankName positionTitle isActive createdAt updatedAt')
      .sort('-createdAt')
      .skip(skip)
      .limit(safeLimit)
      .lean(),
    BankRecruitment.countDocuments(),
  ]);

  return {
    items,
    pagination: { page: safePage, limit: safeLimit, total, pages: Math.ceil(total / safeLimit) },
  };
};

export const create = async ({
  bankLogoUrl,
  bankLogoPublicId,
  bankName,
  positionTitle,
  details,
  createdBy,
}) => {
  return BankRecruitment.create({
    bankLogoUrl,
    bankLogoPublicId,
    bankName,
    positionTitle,
    details,
    createdBy,
  });
};

export const updateById = async (id, update) => {
  return BankRecruitment.findByIdAndUpdate(id, update, { new: true, runValidators: true });
};

/** Remove document from DB and delete logo from Cloudinary (best-effort). */
export const deleteById = async (id) => {
  const doc = await BankRecruitment.findById(id);
  if (!doc) return null;
  if (doc.bankLogoPublicId) {
    try {
      await deleteImageByPublicId(doc.bankLogoPublicId);
    } catch {
      // ignore Cloudinary errors; still remove DB row
    }
  }
  await BankRecruitment.findByIdAndDelete(id);
  return doc;
};

